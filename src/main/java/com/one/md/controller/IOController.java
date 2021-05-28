package com.one.md.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class IOController {

    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

}
