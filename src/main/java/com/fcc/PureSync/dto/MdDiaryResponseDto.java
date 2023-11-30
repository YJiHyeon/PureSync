package com.fcc.PureSync.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MdDiaryResponseDto {
    Long dySeq;
    String dyDate;
    String dyTitle;
    String dyContents;
    String emoState;
}
