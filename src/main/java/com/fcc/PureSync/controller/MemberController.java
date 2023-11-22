package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.LoginDto;
import com.fcc.PureSync.dto.SignupDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public HashMap<String, Object> signUp(@RequestBody SignupDto signupDto) {

        return memberService.signUp(signupDto);
    }

    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody LoginDto loginDto) {

        return memberService.login(loginDto);
    }

    @GetMapping("/check-duplicate/{field}/{value}")
    public HashMap<String, Object> checkDuplicate(@PathVariable String field, @PathVariable String value) {

        return memberService.checkDuplicate(field, value);
    }
}