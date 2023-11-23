package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.service.MdDiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/MdDiary")
public class MdDiaryController {
    private final MdDiaryService mdDiaryService;
    @GetMapping("/list/{memId}")
    public ResultDto getMdDiaryList(@PathVariable("memId") String memId, Pageable pageable) {
        return mdDiaryService.getMdDiaryList(memId, pageable);
    }
}
