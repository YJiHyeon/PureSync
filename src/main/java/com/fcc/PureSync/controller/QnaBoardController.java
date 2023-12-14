package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.QnaBoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.service.QnaBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/qnaBoard")
@RequiredArgsConstructor
public class QnaBoardController {
    private final QnaBoardService qnaBoardService;

    /**
     * 등록
     */
    @PostMapping
    public ResultDto createQnaBoard(QnaBoardDto qnaBoardDto, List<MultipartFile> file) throws IOException {
        return qnaBoardService.createQnaBoard(qnaBoardDto, file);
    }

    /**
     * 수정
     */
    @PutMapping("/{qnaBoardSeq}")
    public ResultDto updateQnaBoard(@PathVariable Long qnaBoardSeq, QnaBoardDto qnaBoardDto, List<MultipartFile> file) throws IOException {
        return qnaBoardService.updateQnaBoard(qnaBoardSeq, qnaBoardDto, file);
    }

    /**
     * 삭제
     */
    @DeleteMapping("/{qnaBoardSeq}")
    public ResultDto deleteQnaBoard(@PathVariable Long qnaBoardSeq) {
        return qnaBoardService.deleteQnaBoard(qnaBoardSeq);
    }

    /**
     * 조회(단일)
     */
    @GetMapping("/{qnaBoardSeq}")
    public ResultDto detailQnaBoard(@PathVariable Long qnaBoardSeq) {
        return qnaBoardService.detailQnaBoard(qnaBoardSeq);
    }

    /**
     * 조회(전체)
     */
    @GetMapping
    public ResultDto getAllQnaBoards(Pageable pageable) {
        return qnaBoardService.findAllQnaBoard(pageable);

    }

    /**
     * 파일 조회
     */
    @GetMapping("/{qnaBoardSeq}/file")
    public ResultDto getQnaBoardFile(@PathVariable Long qnaBoardSeq, Pageable pageable){
        return qnaBoardService.findFileChk(qnaBoardSeq, pageable);
    }



}