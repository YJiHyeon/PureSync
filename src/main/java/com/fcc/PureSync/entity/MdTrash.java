package com.fcc.PureSync.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Entity
@Table(name="tb_md_trash")
public class MdTrash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tsSeq;
    String tsContents;
    Boolean tsStatus;
    LocalDateTime tsWdate;
}
