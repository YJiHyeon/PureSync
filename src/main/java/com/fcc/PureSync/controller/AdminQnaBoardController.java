package com.fcc.PureSync.controller;

import com.fcc.PureSync.common.Pager;
import com.fcc.PureSync.dto.AdminQnaBoardDto;
import com.fcc.PureSync.service.AdminQnaBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AdminQnaBoardController {

    private final AdminQnaBoardService adminQnaBoardService;

    @GetMapping("/admin/qna/list/{pg}")
    public String qnaBoardList(Model model, AdminQnaBoardDto adminQnaBoardDto , @PathVariable("pg") int pg) {
        String searchText = URLDecoder.decode( adminQnaBoardDto.getSearchText() );
        if( searchText == null ) {
            searchText = " ";
        }
        adminQnaBoardDto.setSearchText(searchText);
        adminQnaBoardDto.setStart(pg*10);
        List<AdminQnaBoardDto> qnaBoardList = adminQnaBoardService.getAllQnaBoardList(adminQnaBoardDto);

        model.addAttribute("page", Pager.makePage(10, adminQnaBoardService.getQnaBoardTotalcnt(adminQnaBoardDto), pg));
        model.addAttribute("qnaBoardList", qnaBoardList);
        model.addAttribute("pg", pg );
        return "/qnaBoard/qnaUserList";
    }

    @GetMapping("/admin/qnaCmt/list/{pg}")
    public String adminCmtList(Model model, AdminQnaBoardDto adminQnaBoardDto , @PathVariable("pg") int pg) {
        String searchText = URLDecoder.decode( adminQnaBoardDto.getSearchText() );
        if( searchText == null ) {
            searchText = " ";
        }

        adminQnaBoardDto.setStart(pg*10);
        List<AdminQnaBoardDto> qnaCmtList = adminQnaBoardService.getAllQnaCmtList(adminQnaBoardDto);

        model.addAttribute("page", Pager.makePage(10, adminQnaBoardService.getQnaCmtTotalcnt(adminQnaBoardDto), pg));
        model.addAttribute("qnaCmtList", qnaCmtList);
        model.addAttribute("pg", pg );

        return "/qnaBoard/qnaUserCmtList";
    }

    @GetMapping("/admin/qna/view/{qna_board_seq}")
    public String qnaBoardView(Model model, @PathVariable("qna_board_seq") long qna_board_seq) {
        AdminQnaBoardDto adminQnaBoardDto = new AdminQnaBoardDto();
        adminQnaBoardDto.setQna_board_seq(qna_board_seq);
        AdminQnaBoardDto resultDto = adminQnaBoardService.getQnaBoardView(adminQnaBoardDto);
        List<AdminQnaBoardDto> fileList = adminQnaBoardService.getAllQnaBoardFiles(adminQnaBoardDto);
        model.addAttribute("qnaBoardView", resultDto);
        model.addAttribute("fileList", fileList);
        return "/qnaBoard/qnaUserView";
    }

    @GetMapping("admin/qna/list/delete/{qna_board_seq}")
    @ResponseBody
    public HashMap<String, Object> qnaBoardSoftDelete(AdminQnaBoardDto adminQnaBoardDto) {
        adminQnaBoardService.qnaBoardSoftDelete(adminQnaBoardDto);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "success");
        return  resultMap;
    }

    @GetMapping("admin/qnaCmt/list/delete/{qna_cmt_seq}")
    @ResponseBody
    public HashMap<String, Object> qnaCmtSoftDelete(AdminQnaBoardDto adminQnaBoardDto) {
        adminQnaBoardService.qnaCmtSoftDelete(adminQnaBoardDto);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "success");
        return  resultMap;
    }
}
