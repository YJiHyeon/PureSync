package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


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
    public ResultDto createBoard(@RequestBody BoardDto boardDto, String id) {
        return boardService.createBoard(boardDto, id);
    }

    /**
     * 수정
     */
    @PutMapping("/{boardSeq}")
    public ResultDto updateBoard(@PathVariable Long boardSeq, @RequestBody BoardDto boardDto,String mem_id) {
        return boardService.updateBoard(boardSeq, boardDto, mem_id);
    }

    /**
     * 삭제
     */
    @DeleteMapping("/{boardSeq}")
    public ResultDto deleteBoard(@PathVariable Long boardSeq, String id) {
        return boardService.deleteBoard(boardSeq, id);
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

}
