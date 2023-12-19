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

        List<ExerciseStatsNativeVo> exerciseStatsWeeklyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 6);
        List<ExerciseStatsNativeVo> exerciseStatsMonthlyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 29);
        List<ExerciseStatsNativeVo> exerciseStatsYearlyList =  exerciseRepository.findLastMonthsExerciseStats(member.getMemSeq(), date, 11);

        HashMap<String, Object> exerciseMap = new HashMap<>();
        exerciseMap.put("weekly", exerciseStatsWeeklyList);
        exerciseMap.put("monthly", exerciseStatsMonthlyList);
        exerciseMap.put("yearly", exerciseStatsYearlyList);

        List<SleepStatsNativeVo> sleepStatsWeeklyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 6);
        List<SleepStatsNativeVo> sleepStatsMonthlyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 29);
        List<SleepStatsNativeVo> sleepStatsYearlyList =  sleepRepository.findLastMonthsSleepStats(member.getMemSeq(), date, 11);

        HashMap<String, Object> sleepMap = new HashMap<>();
        sleepMap.put("weekly", sleepStatsWeeklyList);
        sleepMap.put("monthly", sleepStatsMonthlyList);
        sleepMap.put("yearly", sleepStatsYearlyList);

        Optional<DashboardDefaultNativeVo> defaultData = exerciseRepository.findDefaultData(member.getMemSeq(), date);
        List<MenuStatsNativeVo> menuStatsNativeVoList = menuRepository.find7DaysMenuStats(member.getMemSeq(), date);

        data.put("exercise", exerciseMap);
        data.put("sleep", sleepMap);    
        data.put("default", defaultData);
        data.put("menuList", menuStatsNativeVoList);

        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "조회 성공", data);

        return resultDto;
    }

    public ResultDto getRandomPositive() {
        List<Positive> allPositive = positiveRepository.findAll();
        Positive onePositive = null;
        if (!allPositive.isEmpty()) {
            Random random = new Random();
            onePositive = allPositive.get(random.nextInt(allPositive.size()));
        }

        HashMap<String, Object> data = new HashMap<>();
        data.put("Positive", onePositive);
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