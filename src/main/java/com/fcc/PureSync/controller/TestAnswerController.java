package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.service.TestAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestAnswerController {

    private final TestAnswerService testAnswerService;

    @PostMapping("/stress/answer")
    public ResultDto stressAnswer(@RequestBody TestAnswerDto testAnswerDto, String id) {
        return testAnswerService.stressAnswer(testAnswerDto, id);
    }
}
