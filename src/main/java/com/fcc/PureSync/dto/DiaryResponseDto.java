package com.fcc.PureSync.dto;

import com.fcc.PureSync.entity.Emotion;
import com.fcc.PureSync.entity.MdDiary;
import com.fcc.PureSync.util.EmotionField;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiaryResponseDto {
    String dyDate;
    String dyTitle;
    String dyContents;
    String emoState;
}
