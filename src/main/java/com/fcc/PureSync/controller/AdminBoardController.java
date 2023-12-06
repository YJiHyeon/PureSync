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

    @GetMapping("/adminCmtList")
    public String adminCmtList() {
        return "adminCmtList";
    }

    @GetMapping("/userBoardView")
    public String userBoardView() {
        return "userBoardView";
    }

    @GetMapping("/adminBoardView")
    public String adminBoardView() {
        return "adminBoardView";
    }

    @GetMapping("/adminBoardWrite")
    public String adminBoardWrite() {
        return "adminBoardWrite";
    }

    @GetMapping("/adminBoardModify")
    public String adminBoardModify() {
        return "adminBoardModify";
    }


}
