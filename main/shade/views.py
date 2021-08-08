import json

from django.db.models import Manager, Count, Case, When, IntegerField
from django.shortcuts import render
from rest_framework import viewsets
from django.core import serializers
from .serializers import ContentsSerializer, ContentsUserSerializer  # 생성한 serializer import
from .models import Contents, ContentsUser  # User model import
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
import pandas as pd
import numpy as np
import pymysql
from django.apps import apps
from sklearn.metrics.pairwise import cosine_similarity
from collections import OrderedDict
from scipy.sparse.linalg import svds
import ujson


class ContentsViewSet(viewsets.ModelViewSet):  # ModelViewSet 활용
    queryset = Contents.objects.all()
    serializer_class = ContentsSerializer


class ContentsUserViewSet(viewsets.ModelViewSet):  # ModelViewSet 활용
    queryset = ContentsUser.objects.all()
    serializer_class = ContentsUserSerializer


@api_view(['GET'])
def HelloAPI(request):
    print("hello11")
    return Response("hello world!")


@api_view(['GET'])
def ContentsUserAPI(request):
    conn = pymysql.connect(host='shade.cbxhaf2v5wmc.ap-northeast-2.rds.amazonaws.com',
                           port=3306,
                           user='root',
                           password='shade1234',
                           db='shade')
    user_id = request.GET['id']
    sql_input = "SELECT movie_count,show_count FROM (SELECT COUNT(*) AS movie_count FROM contents_user cu JOIN (SELECT contents_id FROM contents WHERE object_type = 'movie') c ON cu.contents_id = c.contents_id WHERE id = " + user_id + " AND cu.check_like IS NOT null) m,(SELECT COUNT(*) AS show_count FROM contents_user cu JOIN (SELECT contents_id FROM contents WHERE object_type = 'show') c ON cu.contents_id = c.contents_id WHERE id = " + user_id + " AND cu.check_like IS NOT null) s"
    count_data = pd.read_sql_query(sql_input, conn)

    movie_count = int(count_data['movie_count'])
    show_count = int(count_data['show_count'])

    if movie_count <= 10 and show_count <= 10:
        print('데이터 부족!!')
        return HttpResponse('데이터가 부족합니다!')

    sql_input = "SELECT cu.contents_id,title FROM contents_user cu RIGHT JOIN (SELECT contents_id,title FROM contents WHERE object_type = 'movie') c ON cu.contents_id = c.contents_id WHERE id = " + user_id + " ORDER BY last_check_date DESC LIMIT 1"
    contents_id_data = pd.read_sql_query(sql_input, conn)
    contents_id_data
    m_contents_id = int(contents_id_data['contents_id'])
    m_title = contents_id_data.iloc[0]['title']

    # 특정 영화와 비슷한 영화
    df = apps.get_app_config('shade').data
    c_sim = apps.get_app_config('shade').genre_c_sim
    target_movie_index = df[df['contents_id'] == m_contents_id].index.values
    sim_index = c_sim[target_movie_index, :20].reshape(-1)
    sim_index = sim_index[sim_index != target_movie_index]

    result = df[['title', 'contents_id', 'poster']].iloc[sim_index][:20]

    # 나와 취향이 비슷한 유저의 시청목록록
    sql_input = "SELECT id,contents_id,rating FROM contents_user WHERE check_like IS NOT null and rating is not null order by id"
    # id,contents_id,rating 데이터
    movie1 = pd.read_sql_query(sql_input, conn)
    sql_input = "SELECT id,contents_id,rating FROM contents_user WHERE check_like IS NOT null and rating is not null group by id order by id"    # id,contents_id,rating 데이터
    movie2 = pd.read_sql_query(sql_input, conn)
    sql_input = "SELECT * from contents where object_type = 'movie'"
    # 영화 meta 데이터
    meta = pd.read_sql_query(sql_input, conn)

    movie1['contents_id'] = movie1['contents_id'].astype(str)
    meta['contents_id'] = meta['contents_id'].astype(str)

    movie = pd.merge(movie1, meta[['contents_id', 'title', 'poster']], on='contents_id')

    id2title = {}
    title2id = {}

    for title, contents_id in zip(movie['title'], movie['contents_id']):
        id2title[contents_id] = title
        title2id[title] = contents_id

    user_base = movie.pivot_table(index='id', columns='contents_id', values='rating').fillna(0)

    CF = cosine_similarity(user_base, user_base)
    CF = pd.DataFrame(CF)

    CF.index = user_base.index
    CF.columns = user_base.index

    cf2 = getCF(int(user_id), movie, CF)
    result['title'] = result['title'].apply(lambda x: ','.join(map(str, x)))
    df_user_movie_ratings = movie1.pivot(index='id', columns='contents_id', values='rating').fillna(0)
    matrix = df_user_movie_ratings.values

    user_ratings_mean = np.mean(matrix, axis=1)

    matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)
    U, sigma, Vt = svds(matrix_user_mean, k=12)
    sigma = np.diag(sigma)
    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns=df_user_movie_ratings.columns)
    print(df_svd_preds)
    print(movie2)
    print(user_id)
    user_id = 1
    user_row_number2 = movie2.index[(movie2['id'] == user_id)].tolist()
    print(user_row_number2)
    user_row_number = user_row_number2[0]
    print(user_row_number)
    print(type(user_row_number))
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
    print(sorted_user_predictions)
    sql_input = "SELECT keyword,c.poster,c.contents_id as contents_id,genre_ids,actor_ids,director_id,c.title FROM contents c LEFT JOIN (SELECT contents_id,GROUP_CONCAT(genre_name SEPARATOR ',') AS genre_names,GROUP_CONCAT(cg.genre_id SEPARATOR ',') AS genre_ids FROM contents_genre cg LEFT JOIN genre g ON cg.genre_id = g.genre_id GROUP BY contents_id) AS genre ON c.contents_id = genre.contents_id LEFT JOIN (SELECT contents_id,GROUP_CONCAT(people_name SEPARATOR ',') AS actor_names,GROUP_CONCAT(ca.people_id SEPARATOR ',') AS actor_ids,GROUP_CONCAT(ca.character_name SEPARATOR ',') AS character_names FROM casting ca LEFT JOIN people p ON ca.people_id=p.people_id WHERE ca.character_name IS NOT NULL AND ca.role = 'ACTOR' GROUP BY contents_id) AS actor ON c.contents_id = actor.contents_id LEFT JOIN (SELECT contents_id,people_name AS director_name,ca.people_id AS director_id FROM casting ca LEFT JOIN people p ON ca.people_id=p.people_id AND role='DIRECTOR' GROUP BY contents_id) AS director ON c.contents_id = director.contents_id WHERE keyword != '' AND keyword IS NOT NULL GROUP BY c.contents_id"
    print('진짜되네2')
    df13 = pd.read_sql_query(sql_input, conn)
    user_data = movie1[movie1.id == user_id]
    user_data['contents_id'] = user_data['contents_id'].astype("str")
    df13['contents_id'] = df13['contents_id'].astype("str")
    print(user_data)
    user_history = user_data.merge(df13, on='contents_id').sort_values(['rating'], ascending=False)

    recommendations = df[~df['contents_id'].isin(user_history['contents_id'])]
    er = pd.DataFrame(sorted_user_predictions).reset_index()
    er['contents_id'] = er['contents_id'].astype("str")
    recommendations['contents_id'] = recommendations['contents_id'].astype("str")
    recommendations = recommendations.merge(er, on='contents_id')

    recommendations = recommendations.rename(columns={user_row_number: 'Predictions'}).sort_values('Predictions', ascending=False)

    js = result.to_json(orient='records', force_ascii=False)
    recommen = recommendations[:20].to_json(orient='records', force_ascii=False)
    recommen = json.loads(recommen)
    # print(js)
    # print(json.loads(js))
    result = result.to_records()
    cf3 = cf2.to_json(orient='records', force_ascii=False)
    print(type(cf3))
    js = json.loads(js)
    cf3 = json.loads(cf3)
    print(js)
    json_data = ujson.dumps([{"title": "\""+m_title+"\"와(과) 비슷한 영화", "contents": js}, {"title": "취향이 비슷한 유저의 시청목록", "contents": cf3}, {"title": "회원님께 추천합니다", "contents": recommen}],
                            escape_forward_slashes=False, ensure_ascii=False)
    print(json_data)
    return HttpResponse(json_data)


@api_view(['GET'])
def movieTitleRecommend(request):
    conn = pymysql.connect(host='shade.cbxhaf2v5wmc.ap-northeast-2.rds.amazonaws.com',
                           port=3306,
                           user='root',
                           password='shade1234',
                           db='shade')
    sql_input = "SELECT li/li2 as liii FROM (SELECT COUNT(case when check_like= 'like' then 1 END) AS li, COUNT(case when check_like IS NOT NULL then 1 END) AS li2  FROM contents_user GROUP BY contents_id) a "

    df_this_data = pd.read_sql_query(sql_input, conn)
    df = apps.get_app_config('shade').data
    c_sim = apps.get_app_config('shade').genre_c_sim
    target_movie_index = df[df['contents_id'] == 178201].index.values
    sim_index = c_sim[target_movie_index, :20].reshape(-1)
    sim_index = sim_index[sim_index != target_movie_index]

    result = df[['title', 'contents_id']].iloc[sim_index][:20]
    return Response(result)


def getCF(user_id, movie, CF):
    my_df = movie[movie['id'] == user_id]
    my_df = my_df['title'].values.tolist()

    recommend_ldx = CF.loc[user_id, :].sort_values(ascending=False)[:10].index.tolist()[1]

    recommend_df = movie[movie['id'] == recommend_ldx]
    recommend_df = recommend_df.sort_values(by='rating', ascending=False)

    return recommend_df[:20]
