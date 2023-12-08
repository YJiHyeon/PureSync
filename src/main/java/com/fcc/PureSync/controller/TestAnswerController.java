package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.service.TestAnswerService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/depression")
    public ResultDto depressionAnswer(@RequestBody TestAnswerDto testAnswerDto, String id) {
        return testAnswerService.depressionAnswer(testAnswerDto, id);
    }

    @GetMapping("/stress/answer/{memSeq}/{ansInfo}")
    public ResultDto getAllStressAnswer(@PathVariable Long memSeq, @PathVariable Integer ansInfo){
        return testAnswerService.getAllStressAnswer(memSeq, ansInfo);
    }

    @GetMapping("/depression/answer/{memSeq}/{ansInfo}")
    public ResultDto getAllDepressionAnswer(@PathVariable Long memSeq, @PathVariable Integer ansInfo){
        return testAnswerService.getAllDepressionAnswer(memSeq, ansInfo);
    }

    @PutMapping("/stress/{memSeq}/{ansInfo}")
    public ResultDto updateStressAnswer(@RequestBody TestAnswerDto testAnswerDto, @PathVariable Long memSeq, @PathVariable Integer ansInfo) {
        return testAnswerService.updateStressAnswer(testAnswerDto, memSeq, ansInfo);
    }

    @PutMapping("/depression/{memSeq}/{ansInfo}")
    public ResultDto updateDepressionAnswer(@RequestBody TestAnswerDto testAnswerDto, @PathVariable Long memSeq, @PathVariable Integer ansInfo) {
        return testAnswerService.updateDepressionAnswer(testAnswerDto, memSeq, ansInfo);
    }
}
