package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.LoginDto;
import com.fcc.PureSync.dto.SignupDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public HashMap<String, Object> signUp(SignupDto signupDto) {
        HashMap<String, Object> map = new HashMap<>();
        Member member = buildMemberFromSignupDto(signupDto);
        try {
            memberRepository.save(member);
            map.put("result", "success");
            //map.put("message", "회원가입이 완료되었습니다.");
        } catch (Exception e) {
            map.put("result", "fail");
            //map.put("message", "Failed to save member");
        }
        return map;
    }

    private Member buildMemberFromSignupDto(SignupDto dto) {
        String encoPassword = passwordEncoder.encode(dto.getMemPassword());
        return Member.builder()
                .memId(dto.getMemId())
                .memPassword(encoPassword)
                .memNick(dto.getMemNick())
                .memEmail(dto.getMemEmail())
                .memBirth(dto.getMemBirth())
                .memGender(dto.getMemGender())
                .build();
    }

    public HashMap<String, Object> login(LoginDto loginDto) {
        HashMap<String, Object> map = new HashMap<>();
        Member member = memberRepository.findByMemId(loginDto.getMemId());
        if (member != null && passwordEncoder.matches(loginDto.getMemPassword(), member.getMemPassword())) {
            map.put("result", "success");
            //map.put("message", "로그인 성공했습니다.");
        }
        else {
            map.put("result", "fail");
            //map.put("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
        }
        return map;
    }

    public HashMap<String, Object> checkDuplicate(String field, String value) {
        HashMap<String, Object> map = new HashMap<>();
        switch (field) {
            case "memId":
                if( memberRepository.findByMemId(value) == null ) {
                    map.put("result", "success");
                    map.put("msg", "사용가능한 아이디입니다.");
                } else {
                    map.put("result", "fail");
                    map.put("msg", "중복된 아이디입니다.");
                }
                break;
            case "memNick":
                if( memberRepository.findByMemNick(value) == null ) {
                    map.put("result", "success");
                    map.put("msg", "사용가능한 닉네임입니다.");
                } else {
                    map.put("result", "fail");
                    map.put("msg", "중복된 닉네임입니다.");
                }
                break;
            case "memEmail":
                if( memberRepository.findByMemEmail(value) == null ) {
                    map.put("result", "success");
                    map.put("msg", "사용가능한 이메일입니다.");
                } else {
                    map.put("result", "fail");
                    map.put("msg", "중복된 이메일입니다.");
                }
                break;
            default:
                map.put("result", "fail");
                break;
        }
        return map;
    }
}
