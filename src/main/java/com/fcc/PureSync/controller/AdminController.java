package com.fcc.PureSync.controller;

import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@RequiredArgsConstructor
@RequestMapping("/admin")
@Controller
public class AdminController {
    private final AdminService adminService;
    @GetMapping("")
    public String adminMain() {
        return "index";
    }

    //로그인 기능.
    @PostMapping("/login")
    public String adminLogin(Model model, @PathVariable("memId")String memId, @PathVariable("password")String password) {
        Member member= adminService.adminLogin(memId,password);
        model.addAttribute("adminInfo",member);
        return "/admin";
    }


}
