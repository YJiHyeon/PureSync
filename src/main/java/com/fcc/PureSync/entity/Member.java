package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_member")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memSeq;
    @Builder.Default
    private Integer memStatus = 1;
    private String memId;
    private String memPassword;
    private String memNick;
    private String memEmail;
    private String memBirth;
    private String memGender;
    private String memImg;
    private Long memImgsize;
    private LocalDateTime memCreatedAt;
    @Builder.Default
    private LocalDateTime memLastLoginAt = LocalDateTime.now();
}