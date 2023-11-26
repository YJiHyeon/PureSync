package com.fcc.PureSync.controller;


import com.fcc.PureSync.dto.CommentDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.SleepDto;
import com.fcc.PureSync.service.SleepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sleep")
@RequiredArgsConstructor
public class SleepController {

    private final SleepService sleepService;

    @PostMapping
    public ResultDto createSleep(@RequestBody SleepDto sleepDto, String id) {
        return sleepService.createSleep(sleepDto, id);
    }

    @PutMapping("/{sleepSeq}")
    public ResultDto updateSleep(@PathVariable Long sleepSeq, @RequestBody SleepDto sleepDto, String id) {
        return sleepService.updateSleep(sleepSeq, sleepDto, id);
    }

    @GetMapping("/{sleepSeq}")
    public ResultDto detailSleep(@PathVariable Long sleepSeq, String id) {
        return sleepService.detailSleep(sleepSeq, id);
    }
}

