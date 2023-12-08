package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.AdminBoardDto;
import com.fcc.PureSync.dto.NoticeDto;
import com.fcc.PureSync.service.AdminBoardService;
import com.fcc.PureSync.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AdminNoticeController {

    private final NoticeService noticeService;

    @GetMapping("/admin/notice/list")
    public String adminBoardList(Model model, NoticeDto noticeDto) {
        List<NoticeDto> noticeList = noticeService.getAllNoticeList(noticeDto);
        model.addAttribute("noticeList", noticeList);
        return "/adminBoard/noticeList";
    }

    @GetMapping("/admin/notice/view/{notice_seq}")
    public String adminBoardView(Model model, @PathVariable("notice_seq") long notice_seq) {
        NoticeDto noticeDto = new NoticeDto();
        noticeDto.setNotice_seq(notice_seq);
        NoticeDto resultDto = noticeService.noticeBoardView(noticeDto);
        model.addAttribute("noticeView", resultDto);
        return "/adminBoard/noticeView";
    }

    @GetMapping("/admin/notice/write")
    public String adminBoardWrite() {
        return "/adminBoard/noticeWrite";
    }

    @PostMapping("/admin/notice/save")
    @ResponseBody
    public HashMap<String, Object> adminBoardSave( @RequestBody NoticeDto noticeDto) {
        noticeService.noticeBoardWrite(noticeDto);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "success");

        return resultMap;
    }

    @GetMapping("/admin/notice/modify/{notice_seq}")
    public String adminBoardModify(Model model, @PathVariable("notice_seq") long notice_seq) {
        NoticeDto noticeDto = new NoticeDto();
        noticeDto.setNotice_seq(notice_seq);
        NoticeDto resultDto = noticeService.noticeBoardView(noticeDto);
        model.addAttribute("noticeModify", resultDto);
        return "/adminBoard/noticeModify";
    }

    @PostMapping("/admin/notice/modifyOk")
    @ResponseBody
    public HashMap<String, Object> adminBoardModifyOk( @RequestBody NoticeDto noticeDto) {
        noticeService.noticeBoardUpdate(noticeDto);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "success");

        return resultMap;
    }

    @GetMapping("/admin/notice/delete/{notice_seq}")
    @ResponseBody
    public HashMap<String, Object> noticeBoardDelete( NoticeDto noticeDto) {
        noticeService.noticeBoardDelete(noticeDto);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "success");
        return  resultMap;
    }


}
