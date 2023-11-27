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
public class Body {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bodySeq;
    private Double bodyHeight;
    private Double bodyWeight;
    private Double bodyWishWeight;
    private Double bodyWishConscal;
    private Double bodyWishBurncal;
    private LocalDateTime bodyWdate;
    private Long memSeq;

    @Builder
    public Body(Double bodyHeight, Double bodyWeight, Double bodyWishWeight,
                Double bodyWishConscal, Double bodyWishBurncal, Long memSeq) {
        this.bodyHeight = bodyHeight;
        this.bodyWeight = bodyWeight;
        this.bodyWishWeight = bodyWishWeight;
        this.bodyWishConscal = bodyWishConscal;
        this.bodyWishBurncal = bodyWishBurncal;
        this.memSeq = memSeq;
        this.bodyWdate = LocalDateTime.now();
    }

}
