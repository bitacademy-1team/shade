package com.one.shade.repository;

import com.one.shade.domain.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewsRepository extends JpaRepository<Reviews,Long>,CustomizedRepository {

//    List<Reviews> findByContentsIdAndDeleteCheckOrderByCreateDateDesc(Long contents_id,String delete_check);
//
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE Reviews r SET r.comment = :comment , r.modify_date = CURRENT_TIMESTAMP WHERE r.contents_id = :contents_id AND r.id = :id")
//    int reviewsModify(@Param("contents_id") Long contents_id, @Param("id") Long id, @Param("comment") String comment);
//
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE Reviews r SET r.delete_check = 'Y' , r.modify_date = CURRENT_TIMESTAMP WHERE r.contents_id = :contents_id AND r.id = :id")
//    int reviewsDelete(@Param("contents_id") Long contents_id);

    Optional<Reviews> findByReviewId(Long review_id);
}
