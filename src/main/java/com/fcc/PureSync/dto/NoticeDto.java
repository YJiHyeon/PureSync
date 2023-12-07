package com.fcc.PureSync.dto;


import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor(access= AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Getter
@Setter
public class NoticeDto {
    private Long notice_seq;
    private String notice_title;
    private String notice_contents;
    @Builder.Default
    private LocalDateTime notice_wdate = LocalDateTime.now() ;
    private String notice_writer;


}
