package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.LoginDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(Member member) {
        member.setMemPassword(passwordEncoder.encode(member.getMemPassword()));
        memberRepository.save(member);
    }

    public boolean login(LoginDto loginDto) {
        Member member = memberRepository.findByMemId(loginDto.getMemId());
        if(member != null && passwordEncoder.matches(loginDto.getMemPassword(), member.getMemPassword())) {
            return true;
        }
        return false;
    }
}
