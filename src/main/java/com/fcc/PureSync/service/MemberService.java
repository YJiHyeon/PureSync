package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.LoginDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.dto.SignupDto;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.jwt.JwtUtil;
import com.fcc.PureSync.repository.MemberRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.fcc.PureSync.exception.CustomExceptionCode.*;
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    // 회원가입
    public ResultDto signup(SignupDto signupDto) {
        Member member = buildMemberFromSignupDto(signupDto);
        try {
            memberRepository.save(member);
            return ResultDto.builder()
                    .code(HttpStatus.CREATED.value())
                    .httpStatus(HttpStatus.CREATED)
                    .message("회원가입을 성공했습니다.")
                    .build();
        }catch (CustomException e){
            throw new CustomException(NOT_INSERT_USER);
        }
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

    public ResultDto login(LoginDto loginDto, HttpServletResponse response) {
        Member member = memberRepository.findByMemId(loginDto.getMemId())
                .orElseThrow( () -> new CustomException(NOT_FOUND_USER_ID) );

        if( !passwordEncoder.matches(loginDto.getMemPassword(), member.getMemPassword()) ){
            throw new CustomException(NOT_FOUND_USER_PW);
        }

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(loginDto.getMemId(), loginDto.getMemPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtUtil.createToken(member);
        response.addHeader("Authorization", "Bearer " + accessToken);

        return ResultDto.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("로그인 성공했습니다요.")
                .build();
    }

    public ResultDto checkDuplicate(String field, String value) {
        ResultDto resultDto;
        switch (field) {
            case "memId":
                if( memberRepository.findByMemId(value).isPresent() ) {
                    resultDto = getResultDtoToDuplicate("사용가능한 아이디입니다.");
                } else {
                    throw new CustomException(ALREADY_EXIST_ID);
                }
                break;
            case "memNick":
                if( memberRepository.findByMemNick(value).isPresent() ) {
                    resultDto = getResultDtoToDuplicate("사용가능한 닉네임입니다.");
                } else {
                    throw new CustomException(ALREADY_EXIST_NICK);
                }
                break;
            case "memEmail":
                if( memberRepository.findByMemEmail(value).isPresent() ) {
                    resultDto = getResultDtoToDuplicate("사용가능한 이메일입니다.");
                } else {
                    throw new CustomException(ALREADY_EXIST_EMAIL);
                }
                break;
            default:
                throw new CustomException(BAD_REQUEST);
        }
        return resultDto;
    }

    private ResultDto getResultDtoToDuplicate(String msg) {
        return ResultDto.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message(msg)
                .build();
    }
}
