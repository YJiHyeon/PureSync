package com.fcc.PureSync.service;

import com.fcc.PureSync.common.constant.EmailConstant;
import com.fcc.PureSync.dto.*;
import com.fcc.PureSync.entity.Body;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.MpMemRole;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.jwt.JwtUtil;
import com.fcc.PureSync.repository.BodyRepository;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.repository.MemberRoleRepository;
import com.fcc.PureSync.util.RandomStringGenerator;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;

import static com.fcc.PureSync.exception.CustomExceptionCode.*;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BodyRepository bodyRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
//    private final MailService mailService;

    // 회원가입
    public ResultDto signup(SignupDto signupDto) {
        //0.회원 정보만 추출해서 빌드
        Member inputMemberInfo = buildMemberFromSignupDto(signupDto);
        //1. 회원 가입
        Member signupMember = memberRepository.save(inputMemberInfo);
        //2. 회원 가입한 정보에서 mp_mem_role할 빌드
//        MpMemRole mpMemRole = (signupMember != null) ? buildMpMemRoleFromMemberSeq(signupMember.getMemSeq()) : null;
        //3. 매핑 테이블에 저장
//        memberRoleRepository.save(mpMemRole);
        //4. 바디 테이블 저장할 데이터 추출
        Body inputBody = buildBodyFromSignDtoAndSignupMember(signupDto, signupMember.getMemSeq());
        //5. 바디 테이블에 저장
        bodyRepository.save(inputBody);
        //6. 메일 전송
//        mailService.signUpByVerificationCode(inputMemberInfo.getMemEmail());
        ResultDto resultDto = handleResultDtoFromSignUp();
        return resultDto;
    }

    //회원 정보 빌드
    private Member buildMemberFromSignupDto(SignupDto dto) {
        String encoPassword = passwordEncoder.encode(dto.getMemPassword());
        return Member.builder()
                .memId(dto.getMemId())
                .memPassword(encoPassword)
                .memNick(dto.getMemNick())
                .memEmail(dto.getMemEmail())
                .memBirth(dto.getMemBirth())
                .memGender(dto.getMemGender())
                .memCreatedAt(LocalDateTime.now())
                .build();
    }

    //회원 권한 정보 빌드
    private MpMemRole buildMpMemRoleFromMemberSeq(Long memSeq) {
        return MpMemRole.builder()
                .memSeq(memSeq)
                .roleSeq(EmailConstant.MEMBER_DISABLED_LEVEL)
                .build();
    }

    //회원 신체 정보 빌드
    private Body buildBodyFromSignDtoAndSignupMember(SignupDto signupDto, Long memSeq) {
        return Body.builder()
                .memSeq(memSeq)
                .bodyHeight(signupDto.getBodyHeight())
                .bodyWeight(signupDto.getBodyHeight())
                .bodyWishWeight(signupDto.getBodyWishWeight())
                .bodyWishConscal(signupDto.getBodyWishConscal())
                .build();
    }

    private ResultDto handleResultDtoFromSignUp() {
        String msg = "회원가입 성공했습니다.";
        HashMap<String, Object> resultMap = new HashMap<>();
        ResultDto resultDto = handleResultDto(msg, resultMap);
        return resultDto;
    }

    //지금 가능하지만 추후 변경 필요. 헤더 토큰 사용 중임.
    public ResultDto login(LoginDto loginDto, HttpServletResponse response) {
        Member member = memberRepository.findByMemIdAndMemStatus(loginDto.getMemId(), 1)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_ID));

        if (!passwordEncoder.matches(loginDto.getMemPassword(), member.getMemPassword())) {
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
                if (memberRepository.findByMemIdAndMemStatus(value, 1).isEmpty()) {
                    resultDto = getResultDtoToDuplicate("사용가능한 아이디입니다.");
                } else {
                    throw new CustomException(ALREADY_EXIST_ID);
                }
                break;
            case "memNick":
                if (memberRepository.findByMemNickAndMemStatus(value, 1).isEmpty()) {
                    resultDto = getResultDtoToDuplicate("사용가능한 닉네임입니다.");
                } else {
                    throw new CustomException(ALREADY_EXIST_NICK);
                }
                break;
            case "memEmail":
                if (memberRepository.findByMemEmailAndMemStatus(value, 1).isEmpty()) {
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

    //아이디로 객체 정보 찾고
    //임시 비밀번호 생성 하고
    //임시 비밀번호 주입하고
    //임시 비밀번호 이메일로 전송
    //임시 비밀번호 링크 클릭시 로그인 페이지로 이동.
    public ResultDto searchPassword(FindPasswordDto findPasswordDto) {
        Member member = memberRepository.findByMemEmail(findPasswordDto.getMemEmail()).orElseThrow(() -> new RuntimeException());
        String newPassword = RandomStringGenerator.generateRandomPassword(12);
        updateTemporaryPassword(member,newPassword);
//        mailService.sendTemporaryPassword(findPasswordDto.getMemEmail(), newPassword);
        ResultDto resultDto = handleResultDtoFromFindPassword();
        return resultDto;
    }

    private ResultDto handleResultDtoFromFindPassword() {
        String msg = "임시 메일을 전송했습니다.";
        HashMap<String, Object> resultMap = new HashMap<>();
        ResultDto resultDto = handleResultDto(msg, resultMap);
        return resultDto;
    }

    private void updateTemporaryPassword(Member member, String newPassword) {
        member.updatePassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }

    public ResultDto searchId(String memEmail) {
        Member member = memberRepository.findByMemEmail(memEmail).orElseThrow(() -> new RuntimeException());
        String memberId = member.getMemId();
        return handleResultDtoFromsearchId(memberId);
    }

    private ResultDto handleResultDtoFromsearchId(String memberId) {
        String msg = "아이디 찾기 성공";
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("memId",memberId);
        ResultDto resultDto = handleResultDto(msg, resultMap);
        return resultDto;
    }

    private ResultDto handleResultDto(String msg, HashMap<String, Object> map) {
        ResultDto resultDto = new ResultDto();
        return resultDto
                .builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message(msg)
                .data(map)
                .build();
    }

}
