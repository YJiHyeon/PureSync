package com.fcc.PureSync.dto;

import com.fcc.PureSync.entity.Board;
import com.fcc.PureSync.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long cmtSeq;
    private String cmtContents;
    private LocalDateTime cmtWdate;
    private Boolean cmtStatus;
    private Long memSeq; // Member의 PK
    private Long boardSeq; // Board의 PK

    public static CommentDto toDto(Comment comment) {
        return CommentDto.builder()
                .cmtSeq(comment.getCmtSeq())
                .cmtContents(comment.getCmtContents())
                .cmtWdate(comment.getCmtWdate())
                .cmtStatus(comment.getCmtStatus())
                .memSeq(comment.getMember().getMemSeq())
                .boardSeq(comment.getBoard().getBoardSeq())
                .build();
    }
}
