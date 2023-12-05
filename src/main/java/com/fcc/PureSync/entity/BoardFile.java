package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_boardfile")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardfileSeq;
    private String boardfileName;
    private Long boardfileSize;
    private String fileUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq", nullable = false)
    private Board board;


}
