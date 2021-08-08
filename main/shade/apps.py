from django.apps import AppConfig
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pymysql


class ShadeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shade'
    print('진짜되네')
    conn = pymysql.connect(host='shade.cbxhaf2v5wmc.ap-northeast-2.rds.amazonaws.com',
                           port=3306,
                           user='root',
                           password='shade1234',
                           db='shade')
    sql_input = "SELECT keyword,c.poster,c.contents_id,genre_ids,actor_ids,director_id,c.title FROM contents c LEFT JOIN (SELECT contents_id,GROUP_CONCAT(genre_name SEPARATOR ',') AS genre_names,GROUP_CONCAT(cg.genre_id SEPARATOR ',') AS genre_ids FROM contents_genre cg LEFT JOIN genre g ON cg.genre_id = g.genre_id GROUP BY contents_id) AS genre ON c.contents_id = genre.contents_id LEFT JOIN (SELECT contents_id,GROUP_CONCAT(people_name SEPARATOR ',') AS actor_names,GROUP_CONCAT(ca.people_id SEPARATOR ',') AS actor_ids,GROUP_CONCAT(ca.character_name SEPARATOR ',') AS character_names FROM casting ca LEFT JOIN people p ON ca.people_id=p.people_id WHERE ca.character_name IS NOT NULL AND ca.role = 'ACTOR' GROUP BY contents_id) AS actor ON c.contents_id = actor.contents_id LEFT JOIN (SELECT contents_id,people_name AS director_name,ca.people_id AS director_id FROM casting ca LEFT JOIN people p ON ca.people_id=p.people_id AND role='DIRECTOR' GROUP BY contents_id) AS director ON c.contents_id = director.contents_id WHERE keyword != '' AND keyword IS NOT NULL GROUP BY c.contents_id"
    print('진짜되네2')
    data = pd.read_sql_query(sql_input, conn)
    print('진짜되네3')
    data['director_id'] = data['director_id'].astype(str)
    data['genre_ids'] = data['genre_ids'].astype(str)
    data['actor_ids'] = data['actor_ids'].astype(str)
    data['title'] = data['title'].astype(str)
    data['keyword'] = data['keyword'].astype(str)
    data['keyword'] = data['keyword'].apply(lambda x: x.split(','))
    data['title'] = data['title'].apply(lambda x: x.split(','))
    data['genre_ids'] = data['genre_ids'].apply(lambda x: x.split(','))
    data['actor_ids'] = data['actor_ids'].apply(lambda x: x.split(',')[:3])
    data['director_id'] = data['director_id'].apply(lambda x: x.split(','))

    data['soup'] = data['genre_ids'] + data['genre_ids'] + data['director_id'] + data['title'] + data['actor_ids'] + \
                   data['keyword']
    data['soup'] = data['soup'].apply(lambda x: ' '.join(x))

    count_vector = CountVectorizer(ngram_range=(1, 2))
    c_vector_genres = count_vector.fit_transform(data['soup'])
    genre_c_sim = cosine_similarity(c_vector_genres, c_vector_genres).argsort()[:, ::-1]
    print(genre_c_sim.shape)
    print('진짜되네4')