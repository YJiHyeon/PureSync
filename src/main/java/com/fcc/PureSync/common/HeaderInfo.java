package com.fcc.PureSync.common;

import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.jwt.JwtAuthenticationFilter;
import com.fcc.PureSync.jwt.JwtUtil;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@RequiredArgsConstructor
@Component
public class HeaderInfo {
    /* 주의 사항
    1. import org.springframework.http.HttpEntity;
       HttpEntity는 종류가 2가지 입니다.

    2. 컨트롤러에서 HttpEntity를 받아서 보내주면 끝입니다.

    3. 프론트 측에서 memSeq, memId를 보내줄 필요가 없습니다.

    */

    private final JwtUtil jwtUtil;

    public Long getMemSeqFromHeader(HttpEntity httpEntity) {
        String accessToken = "";
        Long memSeq= null;
        List<String> accessTokenList;
        for (Map.Entry<String, List<String>> entry : httpEntity.getHeaders().entrySet()) {
            if ("authorization".equals(entry.getKey())){
                accessTokenList = entry.getValue();
                if(!accessTokenList.isEmpty()){
                    accessToken=accessTokenList.get(0);
                }
            }
        }
            String compareToken = accessToken.substring(7);
        if (jwtUtil.validateToken(compareToken)) {
            memSeq = jwtUtil.getMemSeq(compareToken);
        }
        return memSeq;
    }

    public  String getMemIdFromHeader(HttpEntity httpEntity) {
        String accessToken = "";
        String memId= null;
        List<String> accessTokenList;
        for (Map.Entry<String, List<String>> entry : httpEntity.getHeaders().entrySet()) {
            if ("authorization".equals(entry.getKey())){
                accessTokenList = entry.getValue();
                if(!accessTokenList.isEmpty()){
                    accessToken=accessTokenList.get(0);
                }
            }
        }
        String compareToken = accessToken.substring(7);
        if (jwtUtil.validateToken(compareToken))
            memId = jwtUtil.getMemId(compareToken);
        return memId;
    }
}
