package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Member;
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

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final MdDiaryRepository mdDiaryRepository;
    private final ExerciseRepository exerciseRepository;
    private final SleepRepository sleepRepository;
    private final MemberRepository memberRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public ResultDto getDashboardInfo(String memId, String date) {
        Member member = memberRepository.findByMemId(memId).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        
        HashMap<String, Object> data = new HashMap<>();

        List<ExerciseStatsNativeVo> exerciseStatsWeeklyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 7);
        List<ExerciseStatsNativeVo> exerciseStatsMonthlyList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 30);
        List<ExerciseStatsNativeVo> exerciseStatsYearlyList =  exerciseRepository.findLastMonthsExerciseStats(member.getMemSeq(), date, 12);

        HashMap<String, Object> exerciseMap = new HashMap<>();
        exerciseMap.put("weekly", exerciseStatsWeeklyList);
        exerciseMap.put("monthly", exerciseStatsMonthlyList);
        exerciseMap.put("yearly", exerciseStatsYearlyList);

        List<SleepStatsNativeVo> sleepStatsWeeklyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 7);
        List<SleepStatsNativeVo> sleepStatsMonthlyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 30);
        List<SleepStatsNativeVo> sleepStatsYearlyList =  sleepRepository.findLastMonthsSleepStats(member.getMemSeq(), date, 12);

        HashMap<String, Object> sleepMap = new HashMap<>();
        sleepMap.put("weekly", sleepStatsWeeklyList);
        sleepMap.put("monthly", sleepStatsMonthlyList);
        sleepMap.put("yearly", sleepStatsYearlyList);

        List<EmotionNativeVo> emotionNativeVoList = mdDiaryRepository.findDataByMonth(member.getMemSeq(), date);
        Optional<DashboardDefaultNativeVo> defaultData = exerciseRepository.findDefaultData(member.getMemSeq(), date);
        List<MenuStatsNativeVo> menuStatsNativeVoList = menuRepository.find7DaysMenuStats(member.getMemSeq(), date);

        data.put("exercise", exerciseMap);
        data.put("sleep", sleepMap);
        data.put("emotionList", emotionNativeVoList);
        data.put("default", defaultData);
        data.put("menuList", menuStatsNativeVoList);

        ResultDto resultDto =
                ResultDto.builder()
                        .code(HttpStatus.OK.value())
                        .httpStatus(HttpStatus.OK)
                        .message("Success")
                        .data(data)
                        .build();

        return resultDto;
    }
}
