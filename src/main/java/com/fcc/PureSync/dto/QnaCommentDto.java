package com.fcc.PureSync.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fcc.PureSync.entity.Comment;
import com.fcc.PureSync.entity.QnaComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaCommentDto {
    private Long qnaCmtSeq;
    private String qnaCmtContents;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime qnaCmtWdate;
    private Long memSeq;
    private Long qnaBoardSeq;

    public static QnaCommentDto toDto(QnaComment qnaComment) {
        return QnaCommentDto.builder()
                .qnaCmtSeq(qnaComment.getQnaCmtSeq())
                .qnaCmtContents(qnaComment.getQnaCmtContents())
                .qnaCmtWdate(qnaComment.getQnaCmtWdate())
                .memSeq(qnaComment.getMember().getMemSeq())
                .qnaBoardSeq(qnaComment.getQnaBoard().getQnaBoardSeq())
                .build();
    }
}