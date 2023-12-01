package com.fcc.PureSync.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fcc.PureSync.entity.Board;
import com.fcc.PureSync.entity.BoardFile;
import com.fcc.PureSync.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private Long boardSeq;
    private String boardName;
    private String boardContents;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime boardWdate;
    private Long boardLikescount;
    private Long memSeq;
    private String memId;
    private boolean boardStatus;
    private String boardfileName;
    private List<CommentDto> comment;




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

    public static BoardDto BoardDetailDto(Board board) {
        List<CommentDto> commentDtoList = board.getComments().stream()
                .filter(Comment::isCmtStatus)
                .map(CommentDto::toDto)
                .sorted(Comparator.comparing(CommentDto::getCmtWdate).reversed())
                .toList();
        return BoardDto.builder()
                .boardSeq(board.getBoardSeq())
                .boardName(board.getBoardName())
                .boardContents(board.getBoardContents())
                .boardWdate(board.getBoardWdate())
                .boardLikescount(board.getBoardLikescount())
                .memSeq(board.getMember().getMemSeq())
                .memId(board.getMember().getMemId())
                .boardStatus(board.isBoardStatus())
                .boardfileName(Optional.ofNullable(board.getBoardFile()).map(BoardFile::getBoardfileName).orElse(null))
                .comment(commentDtoList)
                .build();
    }

    public static BoardDto BoardAllDetailDto(Board board) {

        return BoardDto.builder()
                .boardSeq(board.getBoardSeq())
                .boardName(board.getBoardName())
                .boardContents(board.getBoardContents())
                .boardWdate(board.getBoardWdate())
                .boardLikescount(board.getBoardLikescount())
                .memSeq(board.getMember().getMemSeq())
                .memId(board.getMember().getMemId())
                .boardStatus(board.isBoardStatus())
                .build();
    }


}