package com.fcc.PureSync.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @GetMapping("/")
    public String adminMain() {
        return "index";
    }

    //로그인 기능.
    @GetMapping("/login")
    public String adminLogin() {
        return "/member/login";
    }


}
