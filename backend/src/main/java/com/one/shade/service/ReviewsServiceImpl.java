package com.one.shade.service;

import com.one.shade.domain.Reviews;
import com.one.shade.repository.ReviewsRepository;
import com.one.shade.vo.ReviewsListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewsServiceImpl implements ReviewsService{

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Override
    @Transactional
    public List<ReviewsListVO> reviewsByContentsId(Long contents_id) {

        return reviewsRepository.reviewList(contents_id);
    }

    @Override
    @Transactional
    public int reviewCreate(Long id, Long contents_id, String comment) {

        Reviews review = Reviews.builder()
                .id(id)
                .contentsId(contents_id)
                .deleteCheck("N")
                .comment(comment)
                .modify_date(null)
                .createDate(LocalDateTime.now().toString())
                .build();

        Reviews reviews = reviewsRepository.save(review);

        return reviews == null ? 0:1;
    }

    @Override
    @Transactional
    public int reviewModify(Long review_id, Long id,String comment){
        int result = 0 ;

        Optional<Reviews> review = reviewsRepository.findByReviewId(review_id);

       if(review.isPresent()&&review.get().getId()==id){
           review.get().setComment(comment);
           review.get().setModify_date(LocalDateTime.now().toString());
           Reviews re = reviewsRepository.save(review.get());

           return re == null ? 0:1;
       }

        return result;
    }

    @Override
    @Transactional
    public int reviewDelete(Long review_id, Long id){
        int result = 0 ;

        Optional<Reviews> review = reviewsRepository.findByReviewId(review_id);

        if(review.isPresent()&&review.get().getId()==id){
            review.get().setDeleteCheck("Y");
            review.get().setModify_date(LocalDateTime.now().toString());
            Reviews re = reviewsRepository.save(review.get());
            return re == null ? 0:1;
        }

        return result;
    }
}
