package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.service.TestAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestAnswerController {

    private final TestAnswerService testAnswerService;

    @PostMapping("/stress")
    public ResultDto stressAnswer(@RequestBody TestAnswerDto testAnswerDto, String id) {
        return testAnswerService.stressAnswer(testAnswerDto, id);
    }

    @GetMapping("/stress/answer")
    public ResultDto getAllStressAnswer(Pageable pageable,String id){
        return testAnswerService.getAllStressAnswer(pageable,id);
    }

    @GetMapping("/depression/answer")
    public ResultDto getAllDepressionAnswer(Pageable pageable,String id){
        return testAnswerService.getAllDepressionAnswer(pageable,id);
    }
}
