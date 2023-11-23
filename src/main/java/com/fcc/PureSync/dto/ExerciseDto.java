package com.fcc.PureSync.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
//매개변수가 없는 생성자를 PROTECED  접근권한으로 만들어라  == 직접객체생성 하지 마라
@NoArgsConstructor(access= AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Setter
public class ExerciseDto {
    private Long el_seq;
    private LocalDateTime exercise_wdate;
    private Integer el_tme;
    private Double el_kcal;
    private Long ec_seq;
    private Long mem_seq;
    private String el_date;

    private String ec_name;
    private Double ec_calc;
    private String mem_gender;
    private Double body_height;
    private Double body_weigh;


}
