package com.fcc.PureSync.dto;

import com.fcc.PureSync.entity.MdDiary;
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
    String memNick;
    String emoState;

    public DiaryResponseDto toDto(MdDiary mdDiary) {
        return DiaryResponseDto.builder()
                .dyDate(mdDiary.getDyDate())
                .dyTitle(mdDiary.getDyTitle())
                .dyContents(mdDiary.getDyContents())
                .memNick(mdDiary.getMember().getMemNick())
                .emoState(mdDiary.getEmotion().getEmoState())
                .build();
    }
}
