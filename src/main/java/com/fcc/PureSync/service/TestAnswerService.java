package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.TestAnswerDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.TestAnswer;
import com.fcc.PureSync.entity.TestQuestion;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.repository.TestAnswerRepository;
import com.fcc.PureSync.repository.TestQuestionRepository;
import lombok.RequiredArgsConstructor;
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
    public ResultDto stressAnswer(TestAnswerDto testAnswerDto, String id) {
        Long testSeq = 1L;
        id = "aaa";
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        List<TestQuestion> testQuestionList = testQuestionRepository.findByTestSeq(1L);
        //List<TestQuestion> queSeqList = testQuestionRepository.findByTestSeqOrderByQueSeqAsc(testSeq);

        TestAnswer testAnswer = TestAnswer.builder()
                .testSeq(testSeq)
                .testAns(testAnswerDto.getTestAns())
                .testQuestion(testQuestionList.get(0))
                .member(member)
                .build();

        testAnswerRepository.save(testAnswer);
        HashMap<String, Object> map = new HashMap<>();
        map.put("testAnswer", toDto(testAnswer));

        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "스트레스 테스트 답변 완료", map);


    }
}