package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.service.BoardService;
import com.fcc.PureSync.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final MemberRepository memberRepository;

    /**
     * 등록
     */
    @PostMapping
    public ResultDto createBoard(BoardDto boardDto, String memSeqStr, MultipartFile file) {
        return boardService.createBoard(boardDto, memSeqStr, file);
    }

    /**
     * 수정
     */
    @PutMapping("/{boardSeq}")
    public ResultDto updateBoard(@PathVariable Long boardSeq, @RequestPart("boardDto") BoardDto boardDto, String id, @RequestPart(value = "file", required = false) MultipartFile file) {
        return boardService.updateBoard(boardSeq, boardDto, id, file);
    }

    /**
     * 삭제
     */
    @DeleteMapping("/{boardSeq}")
    public ResultDto deleteBoard(@PathVariable Long boardSeq, @AuthenticationPrincipal String memSeqStr) {

        return boardService.deleteBoard(boardSeq, memSeqStr);
    }

    /**
     * 조회(단일)
     */
    @GetMapping("/{boardSeq}")
    public ResultDto detailBoard(@PathVariable Long boardSeq, String id) {
        return boardService.detailBoard(boardSeq, id);
    }

    /**
     * 조회(전체)
     */
    @GetMapping
    public ResultDto getAllBoards(Pageable pageable , String id) {
        return boardService.findAllBoard(pageable,id);

    }

    /**
     * 파일 조회
     */
    @GetMapping("/{boardSeq}/file")
    public ResultDto getBoardFile(@PathVariable Long boardSeq){
        return boardService.findFileChk(boardSeq);
    }

}