package com.fcc.PureSync.controller;

import com.fcc.PureSync.common.HeaderInfo;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.service.TestAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestAnswerController {

    private final TestAnswerService testAnswerService;
    private final HeaderInfo headerInfo;
    @PostMapping("/stress")
    public ResultDto stressAnswer(HttpEntity httpEntity, @RequestBody TestAnswerDto testAnswerDto) {
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.stressAnswer(memSeq, testAnswerDto);
    }

    @PostMapping("/depression")
    public ResultDto depressionAnswer(HttpEntity httpEntity, @RequestBody TestAnswerDto testAnswerDto) {
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.depressionAnswer(memSeq, testAnswerDto);
    }

    @GetMapping("/stress/answer/{testSeq}")
    public ResultDto getAllStressAnswer(HttpEntity httpEntity, @PathVariable int testSeq){
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.getAllStressAnswer(memSeq, testSeq);
    }

    @GetMapping("/depression/answer/{testSeq}")
    public ResultDto getAllDepressionAnswer(HttpEntity httpEntity, @PathVariable int testSeq){
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.getAllDepressionAnswer(memSeq, testSeq);
    }

    @PutMapping("/stress/{testSeq}")
    public ResultDto updateStressAnswer(HttpEntity httpEntity, @RequestBody TestAnswerDto testAnswerDto, @PathVariable int testSeq) {
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.updateStressAnswer(memSeq, testAnswerDto, testSeq);
    }

    @PutMapping("/depression/{testSeq}")
    public ResultDto updateDepressionAnswer(HttpEntity httpEntity, @RequestBody TestAnswerDto testAnswerDto, @PathVariable int testSeq) {
        Long memSeq = headerInfo.getMemSeqFromHeader(httpEntity);
        return testAnswerService.updateDepressionAnswer(memSeq, testAnswerDto, testSeq);
    }
}
