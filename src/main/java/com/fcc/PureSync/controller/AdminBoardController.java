package com.fcc.PureSync.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminBoardController {

    @GetMapping("/admin/user/list")
    public String userBoardList() {
        return "/userBoard/userList";
    }

    @GetMapping("/admin/cmt/list")
    public String adminCmtList() {
        return "/userBoard/userCmtList";
    }

    @GetMapping("/admin/user/view")
    public String userBoardView() {
        return "/userBoard/userView";
    }

    // notice --------------------------------------------------------------

    @GetMapping("/admin/notice/list")
    public String adminBoardList() {
        return "/adminBoard/noticeList";
    }

    @GetMapping("/admin/notice/view")
    public String adminBoardView() {
        return "/adminBoard/noticeView";
    }

    @GetMapping("/admin/notice/write")
    public String adminBoardWrite() {
        return "/adminBoard/noticeWrite";
    }

    @GetMapping("/admin/notice/modify")
    public String adminBoardModify() {
        return "/adminBoard/noticeModify";
    }


}
