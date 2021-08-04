package com.one.shade.repository;

import com.one.shade.domain.ContentsUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ContentsUserRepository extends JpaRepository<ContentsUser,Long>{

    @Query("SELECT c FROM contents_user c")
    List<ContentsUser> IdContentsId();

    @Query("SELECT c FROM contents_user c where c.id = :id AND c.contents_id = :contents_id")
    ContentsUser findOneByIdAndContentsId(@Param("id") Long id, @Param("contents_id") Long contents_id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE contents_user cu SET cu.view_count = cu.view_count+1 , cu.visit_last_date = :date WHERE cu.id = :id AND cu.contents_id = :contents_id")
    int ContentsUserVisit(@Param("id") Long id, @Param("contents_id") Long contents_id, @Param("date")LocalDateTime date);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE contents_user cu SET cu.check_like = :like , cu.rating = :rating , cu.last_check_date = :date WHERE cu.id = :id AND cu.contents_id = :contents_id")
    int ContentsUserLike(@Param("id") Long id, @Param("contents_id") Long contents_id, @Param("date")LocalDateTime date, @Param("like") String like, @Param("rating") Float total_score);
}
