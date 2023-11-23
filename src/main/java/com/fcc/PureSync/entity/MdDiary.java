package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Entity
@Table(name="tb_md_diary")
public class MdDiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long dySeq;
    String dyDate;
    String dyTitle;
    String dyContents;
    Boolean dyStatus;
    LocalDateTime dyWdate;

}
