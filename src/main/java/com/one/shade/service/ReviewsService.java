package com.one.shade.service;

import com.one.shade.domain.Reviews;
import com.one.shade.repository.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ReviewsService {
    @Autowired
    private ReviewsRepository reviewsRepository;

    public List<Reviews> getAllReviews(){
        return reviewsRepository.findAll();
    }
    public Reviews createReviews(Reviews reviews){
        return reviewsRepository.save(reviews);
    }
    public ResponseEntity<Reviews> getReviews(Long id){
        Reviews reviews=reviewsRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return ResponseEntity.ok(reviews);
    }
    public ResponseEntity<Reviews>updateReviews(
            Long id,Reviews updatedReviews){
        Reviews reviews=reviewsRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));

        reviews.setComment(updatedReviews.getComment());

        Reviews endUpdatedReviews=reviewsRepository.save(reviews);
        return ResponseEntity.ok(endUpdatedReviews);
    }
    public ResponseEntity<Map<String,Boolean>>deleteReviews(
            Long id){
        Reviews reviews=reviewsRepository.findById((id)).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));

        reviewsRepository.delete(reviews);
        Map<String,Boolean>response=new HashMap<>();
        response.put("Delete Reviews Data by id:["+id+"]",Boolean.TRUE);
        return ResponseEntity.ok(response);

    }


    }

