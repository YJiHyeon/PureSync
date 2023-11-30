package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.*;
import com.fcc.PureSync.jwt.CustomUserDetails;
import com.fcc.PureSync.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/body/signup")  // 회원가입 시 신체정보
    public ResultDto bodySignup(@RequestBody BodySignupDto bodySignupDto) {

        return memberService.bodySignup(bodySignupDto);
    }

    @PostMapping("/login")  // 로그인
    public ResultDto login(@RequestBody LoginDto loginDto, HttpServletResponse response) {

        return memberService.login(loginDto, response);
    }

    @GetMapping("/check-duplicate/{field}/{value}") // 중복검사
    public ResultDto checkDuplicate(@PathVariable String field, @PathVariable String value) {

        return memberService.checkDuplicate(field, value);
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

    @GetMapping("/info")
    public ResultDto getMemberInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {

        Long memSeq = userDetails.getMemSeq();
        return memberService.getMemberInfo(memSeq);
    }

    @PutMapping("/info")
    public ResultDto updateMemberInfo(@AuthenticationPrincipal CustomUserDetails userDetails,
                                      @RequestBody MemberInfoUpdateDto dto) {

        Long memSeq = userDetails.getMemSeq();
        return memberService.updateMemberInfo(dto, memSeq);
    }



}