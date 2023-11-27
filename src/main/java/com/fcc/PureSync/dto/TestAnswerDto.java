package com.fcc.PureSync.dto;

import com.fcc.PureSync.entity.TestAnswer;
import com.fcc.PureSync.entity.TestQuestion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestAnswerDto {

    private Long ansSeq;
    private Long testSeq;
    private int testAns;
    private Long memSeq;
    private Long queSeq;
    private LocalDateTime ansWdate;

    public static TestAnswerDto toDto(TestAnswer testAnswer) {
        return TestAnswerDto.builder()
                .ansSeq(testAnswer.getAnsSeq())
                .testSeq(testAnswer.getTestSeq())
                .testAns(testAnswer.getTestAns())
                .memSeq(testAnswer.getMember().getMemSeq())
                .queSeq(testAnswer.getTestQuestion().getQueSeq())
                .ansWdate(testAnswer.getAnsWdate())
                .build();
    }
}
