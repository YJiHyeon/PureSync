package com.fcc.PureSync.util;

import com.fcc.PureSync.service.MdTrashService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class Scheduler {

    private final MdTrashService mdTrashService;

    //초 분 시 일 월 요일
    @Scheduled(cron = "0 0 0 * * *" )
    public void deleteYesterdayMdTrashes() {
        mdTrashService.deleteYesterdayMdTrashes();
    }
}
