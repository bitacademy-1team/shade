package com.one.shade.service;

import com.one.shade.domain.ContentsUser;
import com.one.shade.dto.ContentsUserDto;
import com.one.shade.repository.ContentsUserRepository;
import com.one.shade.vo.GenreRatingVO;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContentsUserServiceImpl implements ContentsUserService{

    @Autowired
    private ContentsUserRepository contentsUserRepository;

    @PersistenceUnit
    private EntityManagerFactory emf;

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public int ContentsUserInsertOrUpdate(Long id, Long contents_id, String like) {
        ContentsUser contentsUser = findOneByIdAndContentsId(id,contents_id);

        int result = 0 ;
        LocalDateTime date = LocalDateTime.now();
        if(contentsUser==null&&!like.equals("cancel")){
            Float rating = Float.valueOf(like.equals("like") ? 1: (float) 0.1);
            String sql = "SELECT (genre_score+actor_score+director_score) AS total_score FROM (SELECT IFNULL(SUM(genre_score),0) AS genre_score FROM(SELECT genre_id from contents_genre WHERE contents_id = "+contents_id+" ) cg LEFT JOIN (SELECT genre_id,gc/gg AS genre_score FROM (SELECT genre_id,COUNT(*) AS gc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id ORDER BY gc DESC LIMIT 10) a,(SELECT * FROM (select SUM(a.cc) AS gg FROM (SELECT COUNT(*) AS cc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id LIMIT 10) a )b WHERE gg>20)b)gs ON cg.genre_id = gs.genre_id) a,(SELECT IFNULL(SUM(score),0) AS actor_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'ACTOR') ca JOIN (SELECT (pc/total)*1.7 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) as pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30)bb) pc ON ca.people_id = pc.people_id) b,(SELECT IFNULL(SUM(score),0) AS director_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'DIRECTOR' LIMIT 1) cd LEFT JOIN(SELECT (pc/total)*1.8 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5)bb) ds ON cd.people_id = ds.people_id) c";
            Query nativeQuery =  em.createNativeQuery(sql);
            JpaResultMapper jpaMapper = new JpaResultMapper();
            GenreRatingVO genreRatingVO = jpaMapper.uniqueResult(nativeQuery,GenreRatingVO.class);
            float total_score = genreRatingVO.getTotal_score().floatValue();
            total_score = rating+total_score;
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
            ContentsUser c =  contentsUserRepository.save(contentsUser1);
            result = c==null ? 0:1;
        }else if(contentsUser!=null&&like.equals("cancel")){
            System.out.println(contentsUser.getCon_user_id());
            result = contentsUserRepository.ContentsUserLike(id,contents_id,date,null,null);
        }else if(contentsUser!=null&&!like.equals("cancel")) {
            Float rating = Float.valueOf(like.equals("like") ? 1: (float) 0.1);
            System.out.println(like + "22의 점수는"+ rating);
            String sql = "SELECT (genre_score+actor_score+director_score) AS total_score FROM (SELECT IFNULL(SUM(genre_score),0) AS genre_score FROM(SELECT genre_id from contents_genre WHERE contents_id = "+contents_id+" ) cg LEFT JOIN (SELECT genre_id,gc/gg AS genre_score FROM (SELECT genre_id,COUNT(*) AS gc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id ORDER BY gc DESC LIMIT 10) a,(SELECT * FROM (select SUM(a.cc) AS gg FROM (SELECT COUNT(*) AS cc FROM contents_genre WHERE contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 30) s) GROUP BY genre_id LIMIT 10) a )b WHERE gg>20)b)gs ON cg.genre_id = gs.genre_id) a,(SELECT IFNULL(SUM(score),0) AS actor_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'ACTOR') ca JOIN (SELECT (pc/total)*1.7 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) as pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'ACTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 50) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 30)bb) pc ON ca.people_id = pc.people_id) b,(SELECT IFNULL(SUM(score),0) AS director_score FROM(SELECT people_id FROM casting WHERE contents_id = "+contents_id+" AND role = 'DIRECTOR' LIMIT 1) cd LEFT JOIN(SELECT (pc/total)*1.8 AS score,people_id FROM(SELECT SUM(pc) AS total FROM (SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5) a) aa,(SELECT * FROM (SELECT people_id,COUNT(*) AS pc FROM casting c WHERE role = 'DIRECTOR' and contents_id IN (SELECT contents_id FROM (select contents_id from contents_user WHERE id = "+id+" AND check_like = 'like' ORDER BY visit_last_date LIMIT 100) s) GROUP BY people_id) pp WHERE pp.pc > 1 ORDER BY pp.pc DESC LIMIT 5)bb) ds ON cd.people_id = ds.people_id) c";
            Query nativeQuery =  em.createNativeQuery(sql);
            JpaResultMapper jpaMapper = new JpaResultMapper();
            GenreRatingVO genreRatingVO = jpaMapper.uniqueResult(nativeQuery,GenreRatingVO.class);
            System.out.println(genreRatingVO.getTotal_score());
            float total_score = genreRatingVO.getTotal_score().floatValue();
            total_score = rating+total_score;
            System.out.println(like + "33의 점수는"+ total_score);
            result = contentsUserRepository.ContentsUserLike(id,contents_id,date,like,total_score);
//          contentsUserRepository.ContentsUserVisit(id,contents_id,LocalDateTime.now());
        }
        return result;
    }

    @Override
    @Transactional
    public ContentsUser findOneByIdAndContentsId(Long id, Long contents_id) {
        return contentsUserRepository.findOneByIdAndContentsId(id,contents_id);
    }

    @Override
    @Transactional
    public int ContentsUserVisit(Long id, Long contents_id){
        LocalDateTime date = LocalDateTime.now();
        ContentsUser contentsUser = findOneByIdAndContentsId(id,contents_id);

        int result = 0 ;

        if(contentsUser == null){
            ContentsUser contentsUser1 = ContentsUser.builder()
                    .contentsUserDto(
                            ContentsUserDto.builder()
                                    .id(id)
                                    .contents_id(contents_id)
                                    .view_count(1l)
                                    .visit_last_date(date)
                                    .check_like(null)
                                    .last_check_date(null)
                                    .rating(null)
                                    .build())
                    .build();
            ContentsUser c = contentsUserRepository.save(contentsUser1);
            result = c==null ? 0:1;
        }else{
            result = contentsUserRepository.ContentsUserVisit(id,contents_id,date);
        }

        return result;

    }
}
