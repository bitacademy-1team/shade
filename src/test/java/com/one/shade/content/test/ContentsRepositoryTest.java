package com.one.shade.content.test;

import com.one.shade.domain.Contents;
import com.one.shade.domain.QContents;
import com.one.shade.domain.QGenre;
import com.one.shade.domain.QPlatform;
import com.one.shade.repository.ContentsRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jep.Jep;
import jep.JepException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ContentsRepositoryTest{

    @Autowired
    private ContentsRepository contentsRepository;

    @Autowired
    private JPAQueryFactory queryFactory;

    /*@Test
    public void create(){

        Contents content =
                Contents.builder()
                        .contents_id(1l)
                        .opendate(null)
                        .title("제목")
                        .playtime(90L)
                        .object_type("movie")
                        .summary("abcd")
                        .build();
        Contents newContent = contentsRepository.save(content);
        System.out.println(content.toString());
    }*/

    @Test
    @Transactional
    public void list(){

        //List<ContentMovieDetailVO> contentsList =contentsRepository.findAllWithGenre("20210608").stream().map(ContentMovieDetailVO::new).collect(Collectors.toList());


        //System.out.println(contentsList.get(0));
    }
    @Test
    @Transactional
    public void movieList() {
        Pageable pageable = PageRequest.of(20,20);
        List<Long> platform_ids = new ArrayList<>();
        platform_ids = null;
        Long genre_id = null;
        List<Contents> list = queryFactory
                .selectFrom(QContents.contents)
                .leftJoin(QPlatform.platform)
                .on(QContents.contents.contents_id.eq(QPlatform.platform.contents_id))
                .leftJoin(QGenre.genre)
                .on(QContents.contents.contents_id.eq(QGenre.genre.contents_id))
                .where(search(platform_ids,genre_id))
                .groupBy(QContents.contents.contents_id)
                .orderBy(QContents.contents.opendate.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getPageNumber())
                .fetch();

        System.out.println(list.get(0).toString());
        System.out.println(list.get(1));
        System.out.println(list.size());
    }
    @Test
    @Transactional
    public void search(){
        Long genre_id = 6l;
        QContents contents = QContents.contents;
        QGenre genre = QGenre.genre;

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(genre.genre_id.eq(genre_id));

        List<Contents> list = queryFactory.selectFrom(contents)
                .leftJoin(genre)
                .on(contents.contents_id.eq(genre.contents_id))
                .where(builder)
                .fetch();

    }
    public Predicate search(List<Long> platform_ids, Long genre_id){
        QGenre genre = QGenre.genre;
        QPlatform platform = QPlatform.platform;

        BooleanBuilder builder = new BooleanBuilder();

        if(platform_ids != null){
            builder.and(platform.platform_id.in(platform_ids));
        }
        if(genre_id != null){
            builder.and(genre.genre_id.eq(genre_id));
        }

        return builder;
    }

    @Test
    @Transactional
    public void detail(){
        System.out.println(contentsRepository.movieDetail(835626L));

    }

    @Test
    public void python(){
        String title = "어벤져스";
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
            jep.eval("data = pd.read_csv('C:/Users/wlgud30/17.csv').fillna(\"\")");
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
                    "\n\tresult = df['title'].iloc[sim_index][:20]" +
                    "\n\treturn result");
            String str = jep.getValue("get_recommend_movie_list(data,'어바웃 타임')").toString();
            ArrayList<String> list = new ArrayList<String>();
            String [] toList = str.split("\n");
            for(int i = 0 ; i<toList.length;i++){
                list.add(toList[i]);
            }
            System.out.println(list);
            System.out.println(jep.getValue("get_recommend_movie_list(data,'"+title+"')"));
        } catch (JepException e) {
            e.printStackTrace();
        }
    }
}
