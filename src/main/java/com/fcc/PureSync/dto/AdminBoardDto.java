package com.fcc.PureSync.dto;


import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor(access= AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AdminBoardDto {
    // 유저 보드
    private Long board_seq;
    private String board_name;  // 제목
    private String board_contents;
    private String board_wdate;
    private Integer board_likescount;
    private Integer board_status;
    private  Long mem_seq;

    // 유저 댓글
    private  Long cmt_seq;
    private String cmt_contents;
    private String cmt_wdate;
    private Integer cmt_status;

    // 유저 파일
    private Long boardfile_seq;
    private String boardfile_name;
    private String file_url;

    // 관리자 보드
    private Long notice_seq;
    private String notice_title;
    private String notice_content;
    private String notice_wdate;
    private String notice_writer;


}
