package com.fcc.PureSync.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

public interface ExerciseStatsNativeVo {
    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM", timezone = "UTC")
    String getDate();
    int getTotalTime();
    Double getTotalKcal();
}
