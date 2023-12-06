package com.fcc.PureSync.service;//package com.fcc.PureSync.service;
//
//import com.fcc.PureSync.dto.*;
//import com.fcc.PureSync.entity.Member;
//import com.fcc.PureSync.exception.CustomException;
//import com.fcc.PureSync.exception.CustomExceptionCode;
//import com.fcc.PureSync.jwt.CustomUserDetails;
//import com.fcc.PureSync.repository.MemberRepository;
//import com.fcc.PureSync.repository.MyPageRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Service
//public class MyPageService {
//
//    private final MyPageRepository myPageRepository;
//    private final MemberRepository memberRepository;
//
//    public ResultDto getMyPage(CustomUserDetails customUserDetails) {
//        Member member = memberRepository.findByMemSeq(customUserDetails.getMember().getMemSeq()).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_SEQ));
//        ResultDto resultDto = HandleGetMyPageByJPA(member);
//        return null;
//    }
//
//    public ResultDto updateMyPageByMemberEntity(UpdateMyPageDto updateMyPageDto) {
//
//        return null;
//    }
//
//    public ResultDto compareNickname(CompareNicknameDto compareNicknameDto) {
//        return null;
//    }
//
//
//    public ResultDto softDeleteMember(SoftDeleteMemberDto softDeleteMemberDto) {
//        return null;
//    }
//
//    public ResultDto updatePasswordByOldPassword(UpdatePasswordDto updatePasswordDto) {
//        return null;
//    }
//
//    public ResultDto getMyScrap(MyScrapDto myScrapDto) {
//        return null;
//    }
//
//    public ResultDto getMyWrittenTitle(MyWrittenTitleDto myWrittenTitleDto) {
//        return null;
//    }
//
//
//    private ResultDto HandleGetMyPageByJPA(Member member) {
//        String msg = "마이페이지조회";
//        Map<String, Object> resultMap = new HashMap<>();
//        if (member != null)
//            resultMap.put("mypage", member);
//        return buildResultDto(200, HttpStatus.OK, msg, (HashMap<String, Object>) resultMap);
//
//
//    }
//
//    private ResultDto FailDto() {
//        return null;
//    }
//
//
//    private ResultDto buildResultDto(int code, HttpStatus status, String msg, HashMap<String, Object> map) {
//        return ResultDto.builder()
//                .code(code)
//                .httpStatus(status)
//                .message(msg)
//                .data(map)
//                .build();
//    }
//}
