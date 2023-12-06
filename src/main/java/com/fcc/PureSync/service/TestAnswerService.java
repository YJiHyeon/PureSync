package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.TestAnswer;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.repository.TestAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

import static com.fcc.PureSync.dto.TestAnswerDto.toDto;


@Service
@RequiredArgsConstructor
public class TestAnswerService {
    private final MemberRepository memberRepository;
    private final TestAnswerRepository testAnswerRepository;

    public ResultDto buildResultDto(int code, HttpStatus status, String msg, HashMap<String, Object> map) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(status)
                .message(msg)
                .data(map)
                .build();
    }

    public ResultDto stressAnswer(TestAnswerDto testAnswerDto, String id) {
        Long testSeq = 1L;
        id = "aaa";

        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        if (testSeq != 1L) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_TEST);
        } else {
            TestAnswer testAnswer = TestAnswer.builder()
                    .testSeq(testSeq)
                    .testAns(testAnswerDto.getTestAns())
                    .member(member)
                    .build();

            testAnswerRepository.save(testAnswer);
            HashMap<String, Object> map = new HashMap<>();
            map.put("stressTestAnswer", toDto(testAnswer));

            return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 완료", map);
        }
    }

    public ResultDto getAllStressAnswer(Pageable pageable, String id) {
        Long testSeq = 1L;
        id = "aaa";
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        List<TestAnswer> allStressAnwswer = testAnswerRepository.findByMember_MemSeqAndTestSeq(member.getMemSeq(),testSeq,pageable);
        List<TestAnswerDto> allStressAnwswerDto = allStressAnwswer.stream()
                .map(TestAnswerDto::toDto)
                .toList();

        HashMap<String, Object> map = new HashMap<>();
        map.put("allStressAnwswer", allStressAnwswerDto);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 전체 조회 성공", map);
    }

    public ResultDto getAllDepressionAnswer(Pageable pageable, String id) {
        Long testSeq = 2L;
        id = "aaa";
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        List<TestAnswer> allDepressionAnwswer = testAnswerRepository.findByMember_MemSeqAndTestSeq(member.getMemSeq(),testSeq,pageable);
        List<TestAnswerDto> allDepressionAnwswerDto = allDepressionAnwswer.stream()
                .map(TestAnswerDto::toDto)
                .toList();

        HashMap<String, Object> map = new HashMap<>();
        map.put("allDepressionAnwswer", allDepressionAnwswerDto);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "우울증 테스트 답변 전체 조회 성공", map);
    }
}