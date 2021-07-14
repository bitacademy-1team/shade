package com.one.shade.util;

import com.one.shade.dto.ContentsListDto;
import jep.Jep;
import jep.JepException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.List;

public class JepRecommend {

    public static List<ContentsListDto> titleRecommend(String title){

        try {
            Jep jep = new Jep(false,"C:\\Users\\wlgud30\\anaconda3\\envs\\main\\Lib\\site-packages\\jep\\");
            jep.eval("Test = 'Hello world'");
            jep.eval("import pandas as pd");
            jep.eval("import numpy as np");
            jep.eval("import matplotlib.pyplot as plt");
            jep.eval("import seaborn as sns");
            jep.eval("from ast import literal_eval");
            jep.eval("from sklearn.feature_extraction.text import TfidfVectorizer");
            jep.eval("from sklearn.feature_extraction.text import CountVectorizer");
            jep.eval("from sklearn.metrics.pairwise import cosine_similarity");
            jep.eval("from ast import literal_eval");
            jep.eval("data = pd.read_csv('C:/Users/wlgud30/18.csv').fillna(\"\")");
            jep.eval("print(data.head(5))");
            jep.eval("data['keyword'] = data['keyword'].apply(lambda x: x.split(','))");
            jep.eval("data['genre_names'] = data['genre_names'].apply(lambda x: x.split(','))");
            jep.eval("data['actor_names'] = data['actor_names'].apply(lambda x: x.split(',')[:3])");
            jep.eval("data['character_names'] = data['character_names'].apply(lambda x: x.split(','))");
            jep.eval("data['director_name'] = data['director_name'].apply(lambda x: x.split(','))");
            jep.eval("data['soup'] = data['genre_names']+data['director_name']+data['actor_names']+data['keyword']");
            jep.eval("data['soup'] = data['soup'].apply(lambda x: ' '.join(x))");
            jep.eval("count_vector = CountVectorizer(ngram_range=(1,2))");
            jep.eval("c_vector_genres = count_vector.fit_transform(data['soup'])");
            jep.eval("genre_c_sim = cosine_similarity(c_vector_genres, c_vector_genres).argsort()[:, ::-1] \n\t");
            jep.eval("" +
                    "def get_recommend_movie_list(df,movie_title,top=20):" +
                    "\n\ttarget_movie_index = df[df['title'] == movie_title].index.values" +
                    "\n\tsim_index = genre_c_sim[target_movie_index, :top].reshape(-1)" +
                    "\n\tsim_index = sim_index[sim_index != target_movie_index]" +
                    "\n\tresult = df[['title','contents_id','poster']].iloc[sim_index][:20]" +
                    "\n\treturn result");
            jep.eval("js = get_recommend_movie_list(data,'"+title+"').to_json(orient = 'records',force_ascii=False)");
            String contents_json = (String) jep.getValue("js");
            JSONParser jsonParse = new JSONParser();
            JSONArray jArray = null;
            jArray = (JSONArray) jsonParse.parse(contents_json);
            List<ContentsListDto> contentsListDtoList = new ArrayList<>();
            for(Object o : jArray){
                JSONObject obj = (JSONObject) o;
                ContentsListDto content = ContentsListDto.builder()
                        .contents_id((Long) obj.get("contents_id"))
                        .poster((String) obj.get("poster"))
                        .title((String) obj.get("title"))
                        .build();
                contentsListDtoList.add(content);
            }

            return contentsListDtoList;
        } catch (JepException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }

}
