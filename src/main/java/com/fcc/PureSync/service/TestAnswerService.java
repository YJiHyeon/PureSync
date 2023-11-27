package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.dto.TestQuestionDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.TestAnswer;
import com.fcc.PureSync.entity.TestQuestion;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.repository.TestAnswerRepository;
import com.fcc.PureSync.repository.TestQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.fcc.PureSync.dto.TestAnswerDto.toDto;


@Service
@RequiredArgsConstructor
public class TestAnswerService {
    private final MemberRepository memberRepository;
    private final TestQuestionRepository testQuestionRepository;
    private final TestAnswerRepository testAnswerRepository;


    public ResultDto buildResultDto(int code, HttpStatus status, String msg, HashMap<String, Object> map) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(status)
                .message(msg)
                .data(map)
                .build();
    }

    public ResultDto stressAnswer(TestAnswerDto testAnswerDto, String id, Long queSeq) {
        Long testSeq = 1L;
        id = "aaa";
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        TestQuestion testQuestion = testQuestionRepository.findById(queSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_TEST));

        if (testAnswerRepository.countByTestQuestion_QueSeqAndMember_MemSeq(testQuestion.getQueSeq(), member.getMemSeq())>0) {
            return buildResultDto(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, "이미 등록된 답변이 있습니다", null);
        }

        if(testQuestion.getTestSeq()!=1L){
            throw new CustomException(CustomExceptionCode.NOT_FOUND_TEST);
        }else {

            TestAnswer testAnswer = TestAnswer.builder()
                    .testSeq(testSeq)
                    .testAns(testAnswerDto.getTestAns())
                    .testQuestion(testQuestion)
                    .member(member)
                    .build();

            testAnswerRepository.save(testAnswer);
            HashMap<String, Object> map = new HashMap<>();
            map.put("stressTestAnswer", toDto(testAnswer));

            return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 완료", map);

        }
    }

    public ResultDto depressionAnswer(TestAnswerDto testAnswerDto, String id, Long queSeq) {
        Long testSeq = 2L;
        id = "aaa";
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        TestQuestion testQuestion = testQuestionRepository.findById(queSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_TEST));

        if (testAnswerRepository.countByTestQuestion_QueSeqAndMember_MemSeq(testQuestion.getQueSeq(), member.getMemSeq())>0) {
            return buildResultDto(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, "이미 등록된 답변이 있습니다", null);
        }

        if(testQuestion.getTestSeq()!=2L){
            throw new CustomException(CustomExceptionCode.NOT_FOUND_TEST);
        }else {

            TestAnswer testAnswer = TestAnswer.builder()
                    .testSeq(testSeq)
                    .testAns(testAnswerDto.getTestAns())
                    .testQuestion(testQuestion)
                    .member(member)
                    .build();

            testAnswerRepository.save(testAnswer);
            HashMap<String, Object> map = new HashMap<>();
            map.put("depressionTestAnswer", toDto(testAnswer));

            return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "우울증 테스트 답변 완료", map);

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