package com.one.shade.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContentsUserController {

    @RequestMapping("/like/downLike")
    public void userCheckLike(){
        System.out.println("Abcd");
    }
}
