package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

//매개변수가 없는 생성자를 PROTECED  접근권한으로 만들어라  == 직접객체생성 하지 마라
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(name="tb_menu_list")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuSeq;
    private String menuDate;
    private Integer menuWhen;
    private Double menuGram;
    private LocalDateTime menuWdate = LocalDateTime.now();
    private Long memSeq;
    private Long foodSeq;
}
