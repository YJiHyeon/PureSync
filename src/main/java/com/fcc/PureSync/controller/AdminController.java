package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.LoginDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/admin")
@Controller
public class AdminController {
    private final AdminService adminService;
    @GetMapping("/login")
    public String adminMain() {
        return "/admin";
    }

    //로그인 기능.
    @PostMapping("/login")
    public String adminLogin(Model model, @RequestBody LoginDto loginDto) {
        Member member= adminService.adminLogin(loginDto);
        model.addAttribute("adminInfo",member);
        return "/admin";
    }


}
