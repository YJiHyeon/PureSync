package com.fcc.PureSync.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_board")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardSeq;
    private String boardName;
    private String boardContents;
    @Builder.Default
    private LocalDateTime boardWdate=LocalDateTime.now();
    @Builder.Default
    private Long boardLikescount=0L;
    @Builder.Default
    private boolean boardStatus=true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_seq")
    private Member member;

    @OneToOne(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private BoardFile boardFile;


    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Comment> comments;


}