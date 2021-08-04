package com.one.shade.repository;

import com.one.shade.domain.Contents;
import com.one.shade.vo.ContentMovieDetailVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentsRepository extends JpaRepository<Contents,Long>, CustomizedContentsRepository, QuerydslPredicateExecutor<Contents> {

    @Query("SELECT c.poster,c.contents_id FROM Contents c ORDER BY c.opendate desc,c.title")
    Page<Contents> listMovie(@Param("date") String date, Pageable pageable);

    @Query("SELECT c.poster,c.contents_id FROM Contents c ORDER BY c.opendate desc,c.title")
    Page<Contents> listMovieGenre(@Param("date") String date, Pageable pageable);

    @Query(value = "select c,g.genre_name from Contents c left join fetch c.contentGenreList cg left join fetch genre g on cg.genre_id = g.genre_id WHERE c.opendate BETWEEN :date AND NOW() ORDER BY c.opendate")
    List<Contents> findAllWithGenre(@Param("date") String date);

    @Query("SELECT new com.one.shade.vo.ContentSummaryVO(c.contents_id,c.summary) FROM Contents c WHERE c.summary IS NOT NULL and c.keyword is null")
    List<Contents> findContentsIdSummary();

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Contents c SET c.keyword = :keyword WHERE c.contents_id = :id")
    void updateKeyword(String keyword, Long id);

    @Query(name="ContentMovieDetailVO", nativeQuery = true)
    ContentMovieDetailVO movieDetail(@Param("contents_id") Long contents_id);

    List<Contents> findTop12ByTitleContains(String title);

}
