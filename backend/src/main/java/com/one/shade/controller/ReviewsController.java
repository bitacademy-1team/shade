package com.one.shade.controller;


import com.one.shade.domain.Reviews;
import com.one.shade.service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @GetMapping("/reviews")
    public List<Reviews>getAllReviews(){
        return reviewsService.getAllReviews();
    }

    @PostMapping("/reviews")
    public  Reviews createReviews(@RequestBody Reviews reviews){
        return reviewsService.createReviews(reviews);
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<Reviews>getReviewsId(
            @PathVariable Long id){
        return  reviewsService.getReviews(id);
    }
    @PutMapping("/reviews/{id}")
    public ResponseEntity<Reviews> updateReviewsById(
            @PathVariable Long id,@RequestBody Reviews reviews){
        return  reviewsService.updateReviews(id,reviews);
    }
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteReviewsById(
            @PathVariable Long id){
        return reviewsService.deleteReviews(id);
    }


}