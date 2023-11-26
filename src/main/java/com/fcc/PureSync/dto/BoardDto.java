package com.fcc.PureSync.dto;

import com.fcc.PureSync.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private Long boardSeq;
    private String boardName;
    private String boardContents;
    private LocalDateTime boardWdate;
    private Long boardLikescount;
    private Long memSeq;
    private boolean boardStatus;

    //@Builder.Default 시도해보기
    public static BoardDto toDto(Board board) {
        return BoardDto.builder()
                .boardSeq(board.getBoardSeq())
                .boardName(board.getBoardName())
                .boardContents(board.getBoardContents())
                .boardWdate(board.getBoardWdate())
                .boardLikescount(board.getBoardLikescount())
                .memSeq(board.getMember().getMemSeq())
                .boardStatus(board.isBoardStatus())
                .build();
    }

    public BoardDto updateLikesCount(Long likesCount) {
        return this.toBuilder()
                .boardLikescount(likesCount)
                .build();
    }


}