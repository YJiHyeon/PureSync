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
        List<SleepStatsNativeVo> sleepStatsWeeklyList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 7);
        List<EmotionNativeVo> emotionNativeVoList = mdDiaryRepository.findDataByMonth(member.getMemSeq(), date);
        Optional<DashboardDefaultNativeVo> defaultData = exerciseRepository.findDefaultData(member.getMemSeq(), date);
        List<MenuStatsNativeVo> menuStatsNativeVoList = menuRepository.find7DaysMenuStats(member.getMemSeq(), date);

        data.put("exerciseList", exerciseStatsWeeklyList);
        data.put("sleepList", sleepStatsWeeklyList);
        data.put("emotionList", emotionNativeVoList);
        data.put("defaultInfo", defaultData);
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

    @Transactional
    public ResultDto getDashboardDetail(String type, String memId, String date, String target) {
        Member member = memberRepository.findByMemId(memId).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        HashMap<String, Object> data = new HashMap<>();
        List<?> statsList = null;

        if (type.equals("exercise") && target.equals("monthly")) {
            statsList =  exerciseRepository.findLastDaysExerciseStats(member.getMemSeq(), date, 30);

        } else if (type.equals("exercise") && target.equals("yearly")) {
            statsList =  exerciseRepository.findLastMonthsExerciseStats(member.getMemSeq(), date, 12);

        } else if (type.equals("sleep") && target.equals("monthly")) {
            statsList =  sleepRepository.findLastDaysSleepStats(member.getMemSeq(), date, 30);

        } else if (type.equals("sleep") && target.equals("yearly")) {
            statsList =  sleepRepository.findLastMonthsSleepStats(member.getMemSeq(), date, 12);
        }

        data.put(type, statsList);

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
