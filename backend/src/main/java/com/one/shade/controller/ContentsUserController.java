package com.one.shade.controller;

import com.one.shade.config.CurrentUser;
import com.one.shade.repository.UserRepository;
import com.one.shade.security.auth.PrincipalDetails;
import com.one.shade.service.ContentsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://52.79.189.13")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContentsUserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContentsUserService contentsUserService;

    @RequestMapping("/like/checkLike")
    public int userCheckLike(@CurrentUser PrincipalDetails principalDetails, @RequestParam(value = "contents_id") Long contents_id , @RequestParam(value = "like") String like){
        System.out.println(contents_id);
        System.out.println("현재 사용자 번호1111: "+principalDetails);
        System.out.println(like);
        Long id = null;
        if(principalDetails == null||contents_id == null|| like == null){
            return 202;
        }else{
            id = principalDetails.getId();
        }

        int result = contentsUserService.ContentsUserInsertOrUpdate(id,contents_id,like);

        return result;
    }
}
