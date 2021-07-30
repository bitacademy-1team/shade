package com.one.shade.controller;

import com.one.shade.config.CurrentUser;
import com.one.shade.domain.User;
import com.one.shade.exception.ResourceNotFoundException;
import com.one.shade.repository.UserRepository;
import com.one.shade.security.auth.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://52.79.189.13")
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public String allAccess() {
        System.out.println("공용 테이블 접속");
        return "Public Content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String userAccess() {
        System.out.println("유저 테이블 접속");
        return "User Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String adminAccess() {
        System.out.println("어드민 테이블 접속");
        return "Admin Board.";
    }

    @GetMapping("/google")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser PrincipalDetails principalDetails) {
        System.out.println("현재 사용자 번호: "+principalDetails.getId());
        return userRepository.findById(principalDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", principalDetails.getId()));
    }
}
