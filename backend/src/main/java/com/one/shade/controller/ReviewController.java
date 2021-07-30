package com.one.shade.controller;

import com.one.shade.config.CurrentUser;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.ReviewsService;
import com.one.shade.vo.ReviewsListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "http://52.79.189.13")
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RestController
public class ReviewController {

    @Autowired
    private ReviewsService reviewsService;

    //리턴이 -1 이면 비로그인, 0 이면 생성 실패, 1이면 생성 성공
    @RequestMapping("/review/create")
    public int reviewCreate(Long contents_id , String comment, @CurrentUser PrincipalDetails principalDetails){

        Long id = 0l ;
        if(principalDetails == null){
            return -1;
        }else{
            id = principalDetails.getId();
        }

        int result = reviewsService.reviewCreate(id,contents_id,comment) ;

        return result;
    }
    //리턴이 -1 이면 비로그인, 0 이면 수정 실패, 1이면 수정 성공
    @RequestMapping("/review/modify")
    public int reviewModify(Long review_id , String comment, @CurrentUser PrincipalDetails principalDetails){

        Long id = 0l ;
        if(principalDetails == null){
            return -1;
        }else{
            id = principalDetails.getId();
        }

        int result = reviewsService.reviewModify(review_id,id,comment) ;

        return result;
    }

    //리턴이 -1 이면 비로그인, 0 이면 삭제 실패, 1이면 삭제 성공
    @RequestMapping("/review/delete")
    public int reviewDelete(Long review_id , @CurrentUser PrincipalDetails principalDetails){
        Long id = 0l ;
        if(principalDetails == null){
            return -1;
        }else{
            id = principalDetails.getId();
        }

        int result  = reviewsService.reviewDelete(review_id,id);

        return result;
    }

    @RequestMapping("/review/list")
    public List<ReviewsListVO> reviewList(Long contents_id){
        System.out.println("리뷰 콘텐츠 아이디"+contents_id);

        return reviewsService.reviewsByContentsId(contents_id);

    }
}
