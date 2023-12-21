package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.Positive;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.*;
import com.fcc.PureSync.vo.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final MdDiaryRepository mdDiaryRepository;
    private final ExerciseRepository exerciseRepository;
    private final SleepRepository sleepRepository;
    private final MemberRepository memberRepository;
    private final MenuRepository menuRepository;
    private final PositiveRepository positiveRepository;

    @Transactional
    public ResultDto getDashboardInfo(Long memSeq, String date) {
        Member member = memberRepository.findById(memSeq).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        HashMap<String, Object> data = new HashMap<>();
        monthList(data,member.getMemSeq(), date, 29);
        yerarList(data,member.getMemSeq(), date, 11);

        List<ExerciseStatsNativeVo> exerciseStatsWeeklyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 6);
//        List<ExerciseStatsNativeVo> exerciseStatsMonthlyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 29);
//        List<ExerciseStatsNativeVo> exerciseStatsYearlyList =  exerciseRepository.findLastMonthsExerciseStats(member.getMemSeq(), date, 11);

        HashMap<String, Object> exerciseMap = new HashMap<>();
        exerciseMap.put("weekly", exerciseStatsWeeklyList);
//        exerciseMap.put("monthly", exerciseStatsMonthlyList);
//        exerciseMap.put("yearly", exerciseStatsYearlyList);

        List<SleepStatsNativeVo> sleepStatsWeeklyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 6);
        List<SleepStatsNativeVo> sleepStatsMonthlyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 29);
        List<SleepStatsNativeVo> sleepStatsYearlyList =  sleepRepository.findLastMonthsSleepStats(member.getMemSeq(), date, 11);

        HashMap<String, Object> sleepMap = new HashMap<>();
        sleepMap.put("weekly", sleepStatsWeeklyList);
        sleepMap.put("monthly", sleepStatsMonthlyList);
        sleepMap.put("yearly", sleepStatsYearlyList);
        monthListForSleep(sleepMap,member.getMemSeq(),date,29);
        yearListForSleep(sleepMap,member.getMemSeq(),date,11);

        Optional<DashboardDefaultNativeVo> defaultData = exerciseRepository.findDefaultData(member.getMemSeq(), date);
        List<MenuStatsNativeVo> menuStatsNativeVoList = menuRepository.find7DaysMenuStats(member.getMemSeq(), date);

        data.put("exercise", exerciseMap);
        data.put("sleep", sleepMap);    
        data.put("default", defaultData);
        data.put("menuList", menuStatsNativeVoList);

        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "조회 성공", data);

        return resultDto;
    }

    private void yearListForSleep(HashMap<String, Object> sleepMap, Long memSeq, String date, int i) {
    }

    private void monthListForSleep(HashMap<String, Object> sleepMap, Long memSeq, String date, int i) {
    }

    private void yerarList(HashMap<String, Object> data, Long memSeq, String date, int i) {
        List<ExerciseStatsNativeVo> exerciseStatsYearlyList =  exerciseRepository.findLastMonthsExerciseStats(memSeq, date, 11);
        data.put("yearly", exerciseStatsYearlyList);
    }

    private void monthList(HashMap<String, Object> data, Long memSeq, String date, int i) {
        List<ExerciseStatsNativeVo> exerciseStatsMonthlyList =  exerciseRepository.findLastDaysExerciseStats(memSeq, date, 29);
        data.put("monthly", exerciseStatsMonthlyList);
    }




//    public ResultDto getRandomPositive() {
//        List<Positive> allPositive = positiveRepository.findAll();
//        Positive onePositive = null;
//        if (!allPositive.isEmpty()) {
//            Random random = new Random();
//            onePositive = allPositive.get(random.nextInt(allPositive.size()));
//        }
//
//        HashMap<String, Object> data = new HashMap<>();
//        data.put("Positive", onePositive);
//        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "조회 성공", data);
//        return resultDto;
//    }
    public ResultDto getRandomPositive() {
        Instant staartTime = Instant.now();
        List<Positive> allPositive = positiveRepository.findAll();
        Instant endTime = Instant.now();
        Long checkTime = Duration.between(staartTime,endTime).toMillis();
        System.out.println("조회 시간 ms:::::::::" + checkTime);

        HashMap<String, Object> data = new HashMap<>();
        data.put("Positive", allPositive);
        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "조회 성공", data);
        return resultDto;
    }

    public ResultDto buildResultDto(int code, HttpStatus httpStatuss, String message, HashMap<String, Object> data) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(httpStatuss)
                .message(message)
                .data(data)
                .build();
    }
}