package com.fcc.PureSync.controller;

import com.fcc.PureSync.common.HeaderInfo;
import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.jwt.CustomUserDetails;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.service.BoardService;
import com.fcc.PureSync.util.FileUploadUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final MemberRepository memberRepository;
    private final HeaderInfo headerInfo;

    /**
     * 등록
     */
    @PostMapping
    public ResultDto createBoard(BoardDto boardDto, List<MultipartFile> file, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        //        //String id = headerInfo.getMemIdFromHeader(http);

        System.out.println(customUserDetails.getUsername());
        String id = customUserDetails.getUsername();
        return boardService.createBoard(boardDto, file, id);
    }


    /**
     * 수정
     */
    @PutMapping("/{boardSeq}")
    public ResultDto updateBoard(@PathVariable Long boardSeq, BoardDto boardDto, List<MultipartFile> file, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        String id = customUserDetails.getUsername();
        return boardService.updateBoard(boardSeq, boardDto, file, id);
    }

    /**
     * 삭제
     */
    @DeleteMapping("/{boardSeq}")
    public ResultDto deleteBoard(@PathVariable Long boardSeq, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        String id = customUserDetails.getUsername();
        return boardService.deleteBoard(boardSeq, id);
    }

    /**
     * 조회(단일)
     */
    @GetMapping("/{boardSeq}")
    public ResultDto detailBoard(@PathVariable Long boardSeq, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        String id = customUserDetails.getUsername();
        return boardService.detailBoard(boardSeq, id);
    }

    /**
     * 조회(전체)
     */
    @GetMapping
    public ResultDto getAllBoards(Pageable pageable , @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        String id = customUserDetails.getUsername();
        return boardService.findAllBoard(pageable,id);

    }

    /**
     * 파일 조회
     */
    @GetMapping("/{boardSeq}/file")
    public ResultDto getBoardFile(@PathVariable Long boardSeq,Pageable pageable){
        return boardService.findFileChk(boardSeq,pageable);
    }

}