package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.QnaCommentDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.service.QnaCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qnaBoard")
@RequiredArgsConstructor
public class QnaCommentController {


    private final MemberRepository memberRepository;
    private final QnaCommentService commentService;

    /**
     * 등록
     */
    @PostMapping("/{qnaBoardSeq}/comments")
    public ResultDto createComment(@PathVariable Long qnaBoardSeq, @RequestBody QnaCommentDto qnaCommentDto, String id) {
        return commentService.createQnaComment(qnaBoardSeq, qnaCommentDto, id);
    }

    /**
     * 수정
     */
    @PutMapping("/{qnaBoardSeq}/comments/{cmtSeq}")
    public ResultDto updateComment(@PathVariable Long qnaBoardSeq, @PathVariable Long cmtSeq, @RequestBody QnaCommentDto qnaCommentDto, String id) {
        return commentService.updateQnaComment(qnaBoardSeq, cmtSeq, qnaCommentDto, id);
    }

    /**
     * 삭제
     */
    @DeleteMapping("/{qnaBoardSeq}/comments/{cmtSeq}")
    public ResultDto deleteComment(@PathVariable Long qnaBoardSeq, @PathVariable Long cmtSeq, String id) {
        return commentService.deleteQnaComment(qnaBoardSeq, cmtSeq, id);
    }
    /**
     * 조회
     */
    @GetMapping("/{qnaBoardSeq}/comments")
    public ResultDto getComment(Pageable pageable, @PathVariable Long qnaBoardSeq){
        return commentService.getQnaComment(pageable, qnaBoardSeq);
    }
}
