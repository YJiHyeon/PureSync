package com.fcc.PureSync.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminBoardController {

    @GetMapping("/userBoardList")
    public String userBoardList() {
        return "userBoardList";
    }

    @GetMapping("/adminBoardList")
    public String adminBoardList() {
        return "adminBoardList";
    }


}
