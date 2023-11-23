package com.fcc.PureSync.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor(access= AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MenuDto {
    private Long menu_seq;
    private LocalDateTime menu_wdate = LocalDateTime.now() ;
    private Integer menu_when;
    private Long mem_seq;
    private Long food_seq;
    private Double menu_kacl;
    private  Double menu_total;
    private String menu_date;
    private String menu_gram;

    private  String food_name;
    private  String food_car;
    private  String food_pro;
    private  String food_fat;
    private  String food_sugar;
    private  String food_na;
    private  String food_col;
    private  String food_kcal;

}
