package com.fcc.PureSync.service;


import com.fcc.PureSync.dto.BoardDto;
import com.fcc.PureSync.dto.BoardFileDto;
import com.fcc.PureSync.dto.CommentDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Board;
import com.fcc.PureSync.entity.BoardFile;
import com.fcc.PureSync.entity.Comment;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.BoardFileRepository;
import com.fcc.PureSync.repository.BoardRepository;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.fcc.PureSync.dto.BoardDto.toDto;


@Service
@RequiredArgsConstructor
public class BoardService {
    @Value("${fileUploadPath}")
    String fileUploadPath;
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;
    private final MemberRepository memberRepository;

    public ResultDto buildResultDto(int code, HttpStatus status, String msg, HashMap<String, Object> map) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(status)
                .message(msg)
                .data(map)
                .build();
    }
    /**
     * boardStatus가 false면 NOT_FOUND_BOARD
     */
    private void boardStatusChk(Board board) {
        if (!board.isBoardStatus()) {
            throw new CustomException(CustomExceptionCode.ALREADY_DELETED_ARTICLE);
        }
    }

    public ResultDto createBoard(BoardDto boardDto, String id, MultipartFile file) {
        //Long id2 = Long.parseLong(id);
        id = "aaa";//////////////////////////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        System.out.println("*******************" + boardDto.getBoardName());
        System.out.println("*******************" + boardDto.getBoardContents());
        Board board = Board.builder()
                .boardName(boardDto.getBoardName())
                .boardContents(boardDto.getBoardContents())
                .member(member)
                .build();

        boardRepository.save(board);
        Long board_seq = board.getBoardSeq();
        System.out.println("board_seq : " + board_seq);

        /**
         * 파일 존재 o
         */
        if (file != null) {
            System.out.println("********************************************");
            Path uploadDir = Paths.get(fileUploadPath);
            //업로드 폴더의 물리적 구조(절대경로확인)
            String uploadPath = uploadDir.toFile().getAbsolutePath();

            String fileName = FileUploadUtil.upload(uploadPath, file);
            long fileSize = file.getSize();

            BoardFile boardFile = BoardFile.builder()
                    .boardfileName(fileName)
                    .boardfileSize(fileSize)
                    .board(board)
                    .build();

            boardFileRepository.save(boardFile);

            BoardFileDto boardFileDto = BoardFileDto.toDto(boardFile);
            BoardDto boardDtoResult = toDto(board);

            HashMap<String, Object> map = new HashMap<>();
            map.put("board", boardDtoResult);
            map.put("boardFile", boardFileDto);

            return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "게시판 생성 성공", map);
        } else {
            /**
             * 파일 존재 x
             */
            System.out.println("222222222222222222222222222222");
            BoardDto boardDtoResult = toDto(board);
            HashMap<String, Object> map = new HashMap<>();
            map.put("board", boardDtoResult);

            return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "게시판 생성 성공", map);
        }
    }

    public ResultDto updateBoard(Long boardSeq, BoardDto boardDto, String id, MultipartFile file) {
        id = "aaa";//////////////////////////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));
        boardStatusChk(board);

        Board updatedBoard = Board.builder()
                .boardSeq(board.getBoardSeq())
                .boardName(boardDto.getBoardName())
                .boardContents(boardDto.getBoardContents())
                .boardWdate(board.getBoardWdate())
                .member(member)
                .build();

        boardRepository.save(updatedBoard);
        /**
         * 파일 존재 o
         */
        if (file != null) {

            Path uploadDir = Paths.get(fileUploadPath);
            //업로드 폴더의 물리적 구조(절대경로확인)
            String uploadPath = uploadDir.toFile().getAbsolutePath();

            String fileName = FileUploadUtil.upload(uploadPath, file);
            long fileSize = file.getSize();

            BoardFile boardFile = BoardFile.builder()
                    .boardfileName(fileName)
                    .boardfileSize(fileSize)
                    .board(board)
                    .build();

            boardFileRepository.save(boardFile);

            BoardFileDto boardFileDto = BoardFileDto.toDto(boardFile);
            BoardDto boardDtoResult = toDto(board);

            HashMap<String, Object> map = new HashMap<>();
            map.put("board", boardDtoResult);
            map.put("boardFile", boardFileDto);

            return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "게시판 수정 성공", map);
        } else {
            /**
             * 파일 존재 x
             */
            HashMap<String, Object> map = new HashMap<>();
            map.put("updatedBoard", toDto(updatedBoard));

            return buildResultDto(HttpStatus.CREATED.value(), HttpStatus.CREATED, "게시판 수정 성공", map);
        }

    }

    public ResultDto deleteBoard(Long boardSeq, String id) {
        id = "aaa";//////////////////////////////////////////////
        Member member = memberRepository.findByMemId(id)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));
        boardStatusChk(board);

        Board updatedBoard = Board.builder()
                .boardSeq(board.getBoardSeq())
                .boardName(board.getBoardName())
                .boardContents(board.getBoardContents())
                .boardWdate(board.getBoardWdate())
                .boardStatus(false)
                .member(member)
                .build();

        boardRepository.save(updatedBoard);

        HashMap<String, Object> map = new HashMap<>();
        map.put("updatedBoard", toDto(updatedBoard));
        return ResultDto.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("게시판 삭제 성공")
                .data(map)
                .build();
    }

    public ResultDto detailBoard(Long boardSeq, String id) {
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));


//        Long memSeq = board.getMember().getMemSeq();
//        Member member = memberRepository.findById(memSeq)
//                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
//        member.getMemId();
        BoardDto boardDetailDto = BoardDto.BoardDetailDto(board);
        //List<CommentDto> commentDtoList = board.getComments().stream().map(CommentDto::toDto).toList();
        // boardDetailDto.toBuilder().comment(commentDtoList);

        HashMap<String, Object> map = new HashMap<>();

        map.put("boardDetailDto", boardDetailDto);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "게시판 조회 성공", map);
    }

    public ResultDto findAllBoard(Pageable pageable, String id) {
        List<Board> boardPage = boardRepository.findByBoardStatusOrderByBoardWdateDesc(true,pageable).getContent();
        List<BoardDto> boardDetailDtoList = boardPage.stream()
                .map(BoardDto::BoardAllDetailDto)
                .toList();
        HashMap<String, Object> map = new HashMap<>();
        map.put("boardPage", boardDetailDtoList);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "게시판 전체 조회 성공", map);
    }

    public ResultDto findFileChk(Long boardSeq) {
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(()->new CustomException(CustomExceptionCode.NOT_FOUND_BOARD));
        Long boardId = board.getBoardSeq();
        BoardFile boardFile = boardFileRepository.findByBoard_BoardSeq(boardId)
                .orElseThrow(()-> new CustomException(CustomExceptionCode.NOT_FOUND_BOARD));
        BoardFileDto findBoardFile = BoardFileDto.toDto(boardFile);
        HashMap<String, Object> map = new HashMap<>();
        map.put("findBoardFile", findBoardFile);
        return buildResultDto(HttpStatus.OK.value(), HttpStatus.OK, "게시판 파일 조회 성공", map);
    }
}