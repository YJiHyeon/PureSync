package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.CommentDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Board;
import com.fcc.PureSync.entity.Comment;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.BoardRepository;
import com.fcc.PureSync.repository.CommentRepository;
import com.fcc.PureSync.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

import static com.fcc.PureSync.dto.CommentDto.toDto;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public ResultDto buildResultDto(int code, HttpStatus status, String msg, HashMap<String, Object> map) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(status)
                .message(msg)
                .data(map)
                .build();
    }


    public ResultDto createComment(CommentDto commentDto, String id, Long boardSeq) {
        id = "aaa";//////////////////////////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(()-> new CustomException(CustomExceptionCode.NOT_FOUND_BOARD));

        Comment comment = Comment.builder()
                .cmtContents(commentDto.getCmtContents())
                .member(member)
                .board(board)
                .build();

        commentRepository.save(comment);

        CommentDto dto = toDto(comment);
        HashMap<String, Object> map = new HashMap<>();
        map.put("comment", dto);
        return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "댓글 생성 성공", map);
    }

    public ResultDto updateComment(Long boardSeq, Long cmtSeq, CommentDto commentDto, String id) {
        id = "aaa";///////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(()-> new CustomException(CustomExceptionCode.NOT_FOUND_BOARD));

        Comment comment = commentRepository.findById(cmtSeq)
                .orElseThrow(()->new CustomException(CustomExceptionCode.NOT_FOUND_COMMENT));

        Comment updateComment = Comment.builder()
                .cmtSeq(comment.getCmtSeq())
                .cmtContents(commentDto.getCmtContents())
                .member(member)
                .board(board)
                .build();

        commentRepository.save(updateComment);

        CommentDto dto = toDto(comment);
        HashMap<String, Object> map = new HashMap<>();
        map.put("comment", dto);
        return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "댓글 수정 성공", map);

    }

    public ResultDto deleteComment(Long boardSeq, Long cmtSeq, String id) {
        id = "aaa";////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(()-> new CustomException(CustomExceptionCode.NOT_FOUND_BOARD));

        Comment comment = commentRepository.findById(cmtSeq)
                .orElseThrow(()->new CustomException(CustomExceptionCode.NOT_FOUND_COMMENT));

        Comment updatedComment = Comment.builder()
                .cmtSeq(comment.getCmtSeq())
                .cmtContents(comment.getCmtContents())
                .cmtStatus(false)
                .member(member)
                .board(board)
                .build();
        commentRepository.save(updatedComment);

        CommentDto dto = toDto(comment);
        HashMap<String, Object> map = new HashMap<>();
        map.put("comment", dto);
        return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "댓글 삭제 성공", map);
    }


    public ResultDto getComment(Pageable pageable, Long boardSeq) {
        List<Comment> commentList = commentRepository.findByCmtStatus(pageable,true);
        List<CommentDto> commentDtoList = commentList.stream()
                .map(CommentDto::toDto)
                .toList();
        HashMap<String, Object> map = new HashMap<>();
        map.put("commentList", commentDtoList);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "댓글 전체 조회 성공", map);
    }
}
