package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_member")
@Getter
@Setter
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
}
