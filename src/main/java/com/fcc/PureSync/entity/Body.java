package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_body")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Body {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bodySeq;
    private Double bodyHeight;
    private Double bodyWeight;
    private Double bodyWishWeight;
    private Double bodyWishConscal;
    private Double bodyWishBurncal;
    @Builder.Default
    private LocalDateTime bodyWdate = LocalDateTime.now();
    private Long memSeq;

}
