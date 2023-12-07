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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;

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
                    .ansInfo(1)
                    .testAns(testAnswerDto.getTestAns())
                    .member(member)
                    .build();

            testAnswerRepository.save(testAnswer);
            HashMap<String, Object> map = new HashMap<>();
            map.put("stressTestAnswer", toDto(testAnswer));

            return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 완료", map);
        }
    }

    public ResultDto depressionAnswer(TestAnswerDto testAnswerDto, String id) {
        Long testSeq = 2L;
        id = "aaa";

        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        if (testSeq != 2L) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_TEST);
        } else {
            TestAnswer testAnswer = TestAnswer.builder()
                    .testSeq(testSeq)
                    .ansInfo(2)
                    .testAns(testAnswerDto.getTestAns())
                    .member(member)
                    .build();

            testAnswerRepository.save(testAnswer);
            HashMap<String, Object> map = new HashMap<>();
            map.put("depressionTestAnswer", toDto(testAnswer));

            return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "우울증 테스트 답변 완료", map);
        }
    }

    public ResultDto getAllStressAnswer(Long memSeq, Integer ansInfo) {
        Member member = memberRepository.findById(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        TestAnswer testAnswer = testAnswerRepository.findByMemberAndAnsInfo(member, ansInfo);

        HashMap<String, Object> map = new HashMap<>();
        map.put("allStressAnswer", testAnswer);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 조회 성공", map);
    }

    public ResultDto getAllDepressionAnswer(Long memSeq, Integer ansInfo) {
        Member member = memberRepository.findById(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        TestAnswer testAnswer = testAnswerRepository.findByMemberAndAnsInfo(member, ansInfo);

        HashMap<String, Object> map = new HashMap<>();
        map.put("allDepressionAnswer", testAnswer);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "우울증 테스트 답변 조회 성공", map);
    }

    public ResultDto updateStressAnswer(TestAnswerDto testAnswerDto, Long memSeq, Integer ansInfo) {
        Member member = memberRepository.findById(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        // 기존 데이터를 찾기
        TestAnswer testAnswer = testAnswerRepository.findByMemberAndAnsInfo(member, ansInfo);

        // 기존 데이터 업데이트
        TestAnswer updatedTestAnswer = TestAnswer.builder()
                .ansSeq(testAnswer.getAnsSeq())
                .testSeq(testAnswer.getTestSeq())
                .ansInfo(1)
                .testAns(testAnswerDto.getTestAns())
                .member(member)
                .build();

        testAnswerRepository.save(updatedTestAnswer);

        HashMap<String, Object> map = new HashMap<>();
        map.put("stressTestAnswer", toDto(updatedTestAnswer));

        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 수정 완료", map);
    }

    public ResultDto updateDepressionAnswer(TestAnswerDto testAnswerDto, Long memSeq, Integer ansInfo) {
        Member member = memberRepository.findById(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        TestAnswer testAnswer = testAnswerRepository.findByMemberAndAnsInfo(member, ansInfo);

        TestAnswer updatedTestAnswer = TestAnswer.builder()
                .ansSeq(testAnswer.getAnsSeq())
                .testSeq(testAnswer.getTestSeq())
                .ansInfo(2)
                .testAns(testAnswerDto.getTestAns())
                .member(member)
                .build();

        testAnswerRepository.save(updatedTestAnswer);

        HashMap<String, Object> map = new HashMap<>();
        map.put("depressionTestAnswer", toDto(updatedTestAnswer));

        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "우울증 테스트 답변 수정 완료", map);
    }
}