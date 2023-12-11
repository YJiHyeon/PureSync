package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.*;
import com.fcc.PureSync.jwt.CustomUserDetails;
import com.fcc.PureSync.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup") // 회원가입
    public ResultDto signup (@RequestBody SignupDto signupDto) {
        return memberService.signup(signupDto);
    }

    @PostMapping("/login")  // 로그인
    public ResultDto login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        ResultDto resultDto = memberService.login(loginDto);
        createCookie(resultDto,response);
        return resultDto;
    }

    @GetMapping("/check-duplicate/{field}/{value}") // 중복검사
    public ResultDto checkDuplicate(@PathVariable String field, @PathVariable String value) {
        return memberService.checkDuplicate(field, value);
    }

    @PostMapping("/searchPassword")
    public ResultDto searchPassword(@RequestBody FindPasswordDto findPasswordDto){
    return memberService.searchPassword(findPasswordDto);
    }

    @GetMapping("/searchId")
    public ResultDto searchId(@PathVariable("memEmail") String memEmail){
        return memberService.searchId(memEmail);
    }


    @GetMapping("/token")
    public HashMap<String, Object> token(@AuthenticationPrincipal CustomUserDetails userDetails) {
        HashMap<String, Object> map = new HashMap<>();
        String memId = userDetails.getUsername();
        Long memSeq = userDetails.getMemSeq();
        map.put("memId", memId);
        map.put("memSeq", memSeq);
        return map;
    }

    private void createCookie( ResultDto resultDto, HttpServletResponse response){
        String accessToken = resultDto.getData().values().iterator().next().toString();
        Cookie cookie = new Cookie("accessToken",accessToken); //
        cookie.setMaxAge(1 * 24 * 60 * 60);
//        cookie.setHttpOnly(true); https에서만 사용
//        cookie.setSecure(true);
        cookie.setPath("/");
        System.out.println(cookie);
        response.addCookie(cookie);
    }


}