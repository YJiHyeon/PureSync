package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.service.DashboardService;
import com.fcc.PureSync.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping(value = {"/dashboard/{memId}", "/dashboard/{memId}/{baseDate}"})
    public ResultDto getDashboardInfo(@PathVariable("memId") String memId, @PathVariable(required = false) String baseDate) {
        if (baseDate == null) {
            LocalDate localDate = LocalDate.now();
            baseDate = localDate.toString();
        }

        return dashboardService.getDashboardInfo(memId, baseDate);
    }

    @GetMapping(value = {"{type}/{memId}/{target}", "{type}/{memId}/{baseDate}/{target}"})
    public ResultDto getDashboardDetail(@PathVariable("type") String type, @PathVariable("memId") String memId, @PathVariable(required = false) String baseDate, @PathVariable String target) {
        if (baseDate == null) {
            LocalDate localDate = LocalDate.now();
            baseDate = localDate.toString();
        }

        return dashboardService.getDashboardDetail(type, memId, baseDate, target);
    }


}
