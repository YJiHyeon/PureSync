package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_member")
@Getter
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memSeq;
    private Integer memStatus;
    private String memId;
    private String memPassword;
    private String memNick;
    private String memEmail;
    private String memBirth;
    private String memGender;
    private String memImg;
    private Long memImgsize;
    private LocalDateTime memCreatedAt;
    private LocalDateTime memLastLoginAt;

    @Builder
    public Member(String memId, String memPassword,
                  String memNick, String memEmail, String memBirth, String memGender) {
        this.memId = memId;
        this.memPassword = memPassword;
        this.memNick = memNick;
        this.memEmail = memEmail;
        this.memBirth = memBirth;
        this.memGender = memGender;
        this.memStatus = 1;
        this.memCreatedAt = LocalDateTime.now();
    }
}