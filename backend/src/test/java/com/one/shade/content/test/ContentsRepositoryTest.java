package com.one.shade.content.test;

import com.one.shade.domain.*;
import com.one.shade.dto.ContentsListDto;
import com.one.shade.dto.ContentsUserDto;
import com.one.shade.repository.*;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.ContentsServiceImpl;
import com.one.shade.service.ReviewsService;
import com.one.shade.util.PredicateQuery;
import com.one.shade.vo.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jep.Jep;
import jep.JepException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ContentsRepositoryTest{

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ContentsRepository contentsRepository;
    @Autowired
    private ContentsUserRepository contentsUserRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContentsServiceImpl contentsService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JPAQueryFactory queryFactory;
    @Autowired
    private EpisodeRepository episodeRepository;
    @Autowired
    private PlatformRepository platformRepository;
    @Autowired
    private ReviewsRepository reviewsRepository;
    @Autowired
    private ReviewsService reviewsService;

    @PersistenceUnit
    private EntityManagerFactory emf;

    @PersistenceContext
    private EntityManager em;

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
        System.out.println(contentsRepository.movieDetail(835626L,1l));

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
            System.out.println(jep.getValue("js"));
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
            System.out.println(contentsListDtoList.get(0).toString());
            System.out.println(contentsListDtoList.size());
        } catch (JepException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
    @Test
    @Transactional
    public void userTest() {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("wlgud30", "12341234"));
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Long contents_id = 2l;

        ContentsUser contentsUser = contentsUserRepository.findOneByIdAndContentsId(principalDetails.getId(),contents_id);
        if(contentsUser==null){
            ContentsUser contentsUser1 = ContentsUser.builder()
                    .contentsUserDto(
                            ContentsUserDto.builder()
                            .id(principalDetails.getId())
                            .contents_id(contents_id)
                            .view_count(1l)
                            .visit_last_date(LocalDateTime.now())
                            .build())
                    .build();
            contentsUserRepository.save(contentsUser1);
        }else {
            //update board set count = count + 2 where num = '7'
            contentsUserRepository.ContentsUserVisit(principalDetails.getId(),contents_id,LocalDateTime.now());
        }
        ContentsUser contentsUser2 = contentsUserRepository.findOneByIdAndContentsId(principalDetails.getId(),contents_id);
        System.out.println(contentsUser2);
    }


    @Test
    @Transactional
    public void testJoin(){
        int k = 0 ;
        for(int i = 100 ; i<200 ; i++){
            if(i%2==0){
                k++;
            }
            String username = "test"+i;
            String email = "test"+i+"@test.com";
            String password = "12341234";
            int b = 1960+k;
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(bCryptPasswordEncoder.encode(password));
            user.setRoles(ERole.ROLE_USER);
            user.setBirthday(b+"-01-01");
            user.setNickname("테스트"+i);
            user.setGender("M");
            System.out.println("현재 "+i+"번째 아이디 생성");

            userRepository.save(user);
        }

    }

    @Test
    @Transactional
    public void contentsUserTest(){

        List<User> list = queryFactory.selectFrom(QUser.user)
                .where(QUser.user.id.gt(100))
                .fetch();
        List<Contents> cList = queryFactory.selectFrom(QContents.contents)
                .where(QContents.contents.keyword.isNotEmpty())
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .fetch();
        System.out.println(list);
        System.out.println(list.size());
        EntityManager em = emf.createEntityManager();
        String[] arr = {"like","unlike"};

        for(int k = 0 ;k<1;k++){
            Long id = list.get(k).getId();
            System.out.println(cList.get(k).getContents_id());
            for(int i = 0; i < 1; i++) {
                double dValue = Math.random();
                double fValue = Math.random();
                int iValue = (int)(dValue * 5000);
                int kValue = (int)(fValue * 2);
                Long contents_id = cList.get(iValue).getContents_id();
                System.out.println(arr[kValue]);
                String like = arr[kValue];
                Float rating = Float.valueOf(like.equals("like") ? 1: (float) 0.1);
                try {
                    ContentsUser contentsUser = contentsUserRepository.findOneByIdAndContentsId(id,contents_id);
                    if(contentsUser==null){
                        String sql = "SELECT (genre_score+actor_score+director_score) AS total_score FROM (SELECT IFNULL(SUM(genre_score),0) AS genre_score FROM(SELECT genre_id from contents_genre WHERE contents_id = "+contents_id+" ) cg LEFT JOIN (SELECT genre_id,gc/gg AS genre_score FROM (SELECT genre_id,COUNT(*) AS gc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id ORDER BY gc DESC LIMIT 10) a,(select SUM(a.cc) AS gg FROM (SELECT COUNT(*) AS cc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id LIMIT 10) a )b)gs ON cg.genre_id = gs.genre_id) a,(SELECT IFNULL(SUM(score),0) AS actor_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'ACTOR') ca JOIN (SELECT (pc/total)*1.7 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) as pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30)bb) pc ON ca.people_id = pc.people_id) b,(SELECT IFNULL(SUM(score),0) AS director_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'DIRECTOR' LIMIT 1) cd LEFT JOIN(SELECT (pc/total)*1.8 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5)bb) ds ON cd.people_id = ds.people_id) c";
                        Query nativeQuery =  em.createNativeQuery(sql);
                        JpaResultMapper jpaMapper = new JpaResultMapper();
                        GenreRatingVO genreRatingVO = jpaMapper.uniqueResult(nativeQuery,GenreRatingVO.class);
                        System.out.println(genreRatingVO.getTotal_score());
                        float total_score = genreRatingVO.getTotal_score().floatValue();
                        total_score = rating+total_score;
                        System.out.println("점수는?"+total_score);
                        ContentsUser contentsUser1 = ContentsUser.builder()
                                .contentsUserDto(
                                        ContentsUserDto.builder()
                                                .id(id)
                                                .contents_id(contents_id)
                                                .view_count(1l)
                                                .visit_last_date(LocalDateTime.now())
                                                .check_like(like)
                                                .last_check_date(LocalDateTime.now())
                                                .rating(total_score)
                                                .build())
                                .build();
                        contentsUserRepository.save(contentsUser1);
                    }
                    ContentsUser contentsUser2 = contentsUserRepository.findOneByIdAndContentsId(id,contents_id);
                    System.out.println(contentsUser2);
                }catch (EntityNotFoundException e){
                    System.out.println("hello3");
                    continue;
                }
            }
        }
    }

    @Test
    @Transactional
    public void ratingTest(){
        Long id = 105l;
        Long contents_id = 399l;
//        QGenre qGenre = QGenre.genre;
//        QContentsUser qContentsUser= new QContentsUser("qContentsUser");
//        List<GenreRatingVO> list = queryFactory.select(Projections.constructor(GenreRatingVO.class,qGenre.genre_id,qGenre.genre_id.count().as("genre_score")))
//                .from(qGenre)
//                .where(qGenre.contents_id.in(
//                        JPAExpressions.select(qContentsUser.contents_id)
//                        .from(qContentsUser)
//                        .where(qContentsUser.id.eq(id).and(qContentsUser.check_like.eq("like")))
//                )).groupBy(qGenre.genre_id).fetch();
//        System.out.println(list.get(0));
//        System.out.println(list);
        EntityManager em = emf.createEntityManager();

        String sql = "SELECT (genre_score+actor_score+director_score) AS total_score FROM (SELECT IFNULL(SUM(genre_score),0) AS genre_score FROM(SELECT genre_id from contents_genre WHERE contents_id = "+contents_id+" ) cg LEFT JOIN (SELECT genre_id,gc/gg AS genre_score FROM (SELECT genre_id,COUNT(*) AS gc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id ORDER BY gc DESC LIMIT 10) a,(select SUM(a.cc) AS gg FROM (SELECT COUNT(*) AS cc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id LIMIT 10) a )b)gs ON cg.genre_id = gs.genre_id) a,(SELECT IFNULL(SUM(score),0) AS actor_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'ACTOR') ca JOIN (SELECT (pc/total)*1.7 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) as pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30)bb) pc ON ca.people_id = pc.people_id) b,(SELECT IFNULL(SUM(score),0) AS director_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'DIRECTOR' LIMIT 1) cd LEFT JOIN(SELECT (pc/total)*1.8 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5)bb) ds ON cd.people_id = ds.people_id) c";
        Query nativeQuery =  em.createNativeQuery(sql);
        JpaResultMapper jpaMapper = new JpaResultMapper();
        GenreRatingVO genreRatingVO = jpaMapper.uniqueResult(nativeQuery,GenreRatingVO.class);
        float total_score = genreRatingVO.getTotal_score().floatValue();
        System.out.println(total_score);

    }

    @Test
    public void myRecommendTest(){
        Long id = 103l;
        String str = "186121,2193,10236,49192,49637,60409,79031,89663,91953,98784,104510";
        String [] strarr = str.split(",");

        for (int i = 0 ; i< strarr.length;i++){
            Long contents_id = Long.valueOf(strarr[i]);
            String sql = "SELECT (genre_score+actor_score+director_score) AS total_score FROM (SELECT IFNULL(SUM(genre_score),0) AS genre_score FROM(SELECT genre_id from contents_genre WHERE contents_id = "+contents_id+" ) cg LEFT JOIN (SELECT genre_id,gc/gg AS genre_score FROM (SELECT genre_id,COUNT(*) AS gc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id ORDER BY gc DESC LIMIT 10) a,(select SUM(a.cc) AS gg FROM (SELECT COUNT(*) AS cc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id LIMIT 10) a )b)gs ON cg.genre_id = gs.genre_id) a,(SELECT IFNULL(SUM(score),0) AS actor_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'ACTOR') ca JOIN (SELECT (pc/total)*1.7 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) as pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30)bb) pc ON ca.people_id = pc.people_id) b,(SELECT IFNULL(SUM(score),0) AS director_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'DIRECTOR' LIMIT 1) cd LEFT JOIN(SELECT (pc/total)*1.8 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5)bb) ds ON cd.people_id = ds.people_id) c";
            Query nativeQuery =  em.createNativeQuery(sql);
            JpaResultMapper jpaMapper = new JpaResultMapper();
            GenreRatingVO genreRatingVO = jpaMapper.uniqueResult(nativeQuery,GenreRatingVO.class);
            float total_score = genreRatingVO.getTotal_score().floatValue();
            total_score = 1+total_score;
            System.out.println(total_score);
            ContentsUser contentsUser1 = ContentsUser.builder()
                    .contentsUserDto(
                            ContentsUserDto.builder()
                                    .id(id)
                                    .contents_id(contents_id)
                                    .view_count(1l)
                                    .visit_last_date(LocalDateTime.now())
                                    .check_like("like")
                                    .last_check_date(LocalDateTime.now())
                                    .rating(total_score)
                                    .build())
                    .build();
            contentsUserRepository.save(contentsUser1);
        }
    }

    @Test
    @Transactional
    public void keyTest(){
        List<ContentSummaryVO> list = contentsService.listSummary();
        List<Map> summary = new ArrayList<>();
        String pathPython = "C:\\Users\\wlgud30\\PycharmProjects\\pythonProject\\JavaCall.py";
        String [] cmd = new String[3];
        String str = "";
        String keyword="";
        int i = 0;
        for(ContentSummaryVO vo : list){
            keyword = "\""+vo.getSummary().replaceAll("\"","")+"\"";
            System.out.println(keyword);
            ProcessBuilder pb = new ProcessBuilder()
                    .command("python","-u",pathPython, keyword);
            Process p = null;
            try {
                p = pb.start();
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(p.getInputStream()));
                StringBuilder buffer = new StringBuilder();
                String line = null;
                while ((line = in.readLine()) != null){
                    buffer.append(line);
                }
                int exitCode = p.waitFor();
                //System.out.println(buffer);
                System.out.println("keyword : " + buffer.toString());
                str = buffer.toString().replace("'","").replace("[","").replace("]","").replaceAll(" ","");
                System.out.println("keyword : " + str);
                contentsService.updateKeyword(str,vo.getContents_id());
                in.close();
            }
            catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    @Test
    @Transactional
    public void queryTest(){
        List<Long> platform_ids = new ArrayList<>();
        platform_ids.add(3l);
        QContentsUser cu = QContentsUser.contentsUser;
        QContents c = QContents.contents;
        Long genre_id = 3l;


         queryFactory.select()
                .from((EntityPath<?>) JPAExpressions
                        .selectFrom(QContents.contents)
                        .leftJoin(QPlatform.platform)
                        .on(QContents.contents.contents_id.eq(QPlatform.platform.contents_id))
                        .leftJoin(QGenre.genre)
                        .on(QContents.contents.contents_id.eq(QGenre.genre.contents_id))
                        .where(QContents.contents.object_type.eq("movie").and(PredicateQuery.search(platform_ids,genre_id)))
                        .groupBy(QContents.contents.contents_id)
                        .orderBy(QContents.contents.opendate.desc(),QContents.contents.title.desc())
                        .limit(20))
                .leftJoin(QContentsUser.contentsUser)
                .on()
         ;
    }

    @Test
    @Transactional
    public void findTest(){
        List<ContentsListVO> list = contentsService.findTitle("어");
        System.out.println(list.size());
        System.out.println(list);
    }

    @Test
    @Transactional
    public void showDetail(){
        Long contents_id = 1045767l;
        Long id = 1l;
        String sql = "SELECT c.contents_id,c.title,c.opendate,c.playtime,c.video,c.summary,c.poster,s.sea_video,sea_poster,genre_names,actor_names,sea_list,sea_id_list,check_like FROM contents c LEFT JOIN (SELECT s1.sea_list,s1.sea_id_list,s2.* FROM (select contents_id,GROUP_CONCAT(sea_title ORDER BY sea_opendate,sea_num) AS sea_list,GROUP_CONCAT(season_id ORDER BY sea_opendate,sea_num) AS sea_id_list FROM seasons WHERE contents_id = "+contents_id+") s1 LEFT JOIN (SELECT * FROM seasons ORDER BY sea_opendate ,sea_title ) s2 ON s2.contents_id=s1.contents_id ORDER BY sea_opendate desc,sea_num LIMIT 1)s ON c.contents_id = s.contents_id left join contents_genre cg ON c.contents_id = cg.contents_id LEFT JOIN (SELECT contents_id,GROUP_CONCAT(genre_name SEPARATOR ',') AS genre_names,GROUP_CONCAT(cg.genre_id SEPARATOR ',') AS genre_ids FROM contents_genre cg LEFT JOIN genre g ON cg.genre_id = g.genre_id WHERE cg.contents_id = "+contents_id+") AS genre ON c.contents_id = genre.contents_id LEFT JOIN (SELECT season_id,contents_id,GROUP_CONCAT(people_name SEPARATOR ',') AS actor_names,GROUP_CONCAT(ca.people_id SEPARATOR ',') AS actor_ids,GROUP_CONCAT(ca.character_name SEPARATOR ',') AS character_names FROM casting ca LEFT JOIN people p ON ca.people_id=p.people_id WHERE ca.contents_id="+contents_id+" AND ca.character_name IS NOT NULL AND ca.role = 'ACTOR' GROUP BY season_id) AS actor ON c.contents_id = actor.contents_id AND s.season_id = actor.season_id left JOIN (SELECT * from contents_user where id = "+id+") cu ON c.contents_id = cu.contents_id WHERE c.contents_id = "+contents_id+" ORDER BY sea_num DESC LIMIT 1";
        Query nativeQuery =  em.createNativeQuery(sql);
        JpaResultMapper jpaMapper = new JpaResultMapper();
        ContentsShowDetailVO contentsShowDetailVO = jpaMapper.uniqueResult(nativeQuery,ContentsShowDetailVO.class);

        System.out.println(contentsShowDetailVO);


    }

    @Test
    @Transactional
    public void episodeTest(){

        List<Episode> list = episodeRepository.findBySeasonId(25l);

        List<Platform> list2 = platformRepository.findByEpisodeId(411l);


        List<EpisodePlatformVO> li = list2.stream().map(
                platform -> new EpisodePlatformVO(
                        platform.getContents_id(),
                        platform.getPlatform_id(),
                        platform.getMonetization_type(),
                        platform.getRetail_price(),
                        platform.getUrl(),
                        platform.getPresentation_type(),
                        platform.getEpisodeId()
                )).collect(Collectors.toList());
        System.out.println(li);
    }

    @Test
    @Transactional
    public void reviewsListTest(){
        List<ReviewsListVO> list = reviewsService.reviewsByContentsId(1l);
        System.out.println(list);
    }

    @Test
    @Transactional
    public void reviewModifyTest(){
        int r = reviewsService.reviewModify(1l,2l,"by");
        System.out.println(r);
    }

    @Test
    @Transactional
    public void reviewCreateTest(){
        int r = reviewsService.reviewCreate(1l,1l,"hello");
        System.out.println(r);
    }

    @Test
    @Transactional
    public void reviewDeleteTest(){
        int r = reviewsService.reviewDelete(1l,1l);
        System.out.println(r);
    }
}
