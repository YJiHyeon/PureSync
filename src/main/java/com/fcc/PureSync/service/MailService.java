//package com.fcc.PureSync.service;
//
//import com.fcc.PureSync.common.EmailVerificationResponse;
//import com.fcc.PureSync.common.constant.EmailConstant;
//import com.fcc.PureSync.dao.VerificationCodeDao;
//import com.fcc.PureSync.dto.ResultDto;
//import com.fcc.PureSync.entity.Member;
//import com.fcc.PureSync.entity.MpMemRole;
//import com.fcc.PureSync.repository.MemberRepository;
//import com.fcc.PureSync.repository.MemberRoleRepository;
//import com.fcc.PureSync.util.RandomStringGenerator;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//
//@RequiredArgsConstructor
//@Service
//public class MailService {
//    private final JavaMailSender emailSender;
//
//    //클래스명 함수명 호출 @RequiredArgsConstructor 문제
//    private final VerificationCodeDao verificationCodeDao;
//    private final MemberRepository memberRepository;
//    private final MemberRoleRepository memberRoleRepository;
//    private final JavaMailSender javaMailSender;
//
//    //회원 가입 시 코드 링크
//    public ResultDto signUpByVerificationCode(String newMemberEmail) {
//        String linkCode = RandomStringGenerator.generateEmailVerificationCode(EmailConstant.EMAIL_VERIFICATION_CODE_LENGTH);
//        handleSignUpByVerificationCode(newMemberEmail, linkCode); //메일 전송
//        EmailVerificationResponse emailVerificationResponse = new EmailVerificationResponse(newMemberEmail, linkCode);
//        ResultDto resultDto = handlesignUpByVerificationCodeMap(emailVerificationResponse);
//        return resultDto;
//    }
//
//    private void handleSignUpByVerificationCode(String newMemberEmail, String linkCode) {
//        String DOMAIN = EmailConstant.LOCAL_DOMAIN;
//        String title = EmailConstant.EMAIL_TITLE;
//        String txt = String.format("%s/api/mail/verify?verificationCode=%s&email=%s", DOMAIN, linkCode,newMemberEmail);
//        verificationCodeDao.saveVerificationCode(newMemberEmail, linkCode);
//        sendMail(newMemberEmail, title, txt);
//
//    }
//
//    public ResultDto CheckVerificationCode(String email, String certificationNumber) {
//        if (!isVerify(email, certificationNumber)) {
//            throw new RuntimeException("인증코드가 일치하지 않습니다."); //수정 필요 예외 메세지 조금 더 상세히 -인증코드 불일치
//        }
//        verificationCodeDao.deleteVerificationCode(email);
//        ResultDto resultDto = changeMemberLevel(email);
//        return resultDto;
//    }
//
//    private ResultDto changeMemberLevel(String email) {
//        String msg = "회원 활성화 실패했습니다.";
//        Member member = memberRepository.findByMemEmail(email).orElseThrow(() -> new RuntimeException()); //추후 에러 확인해서 상세 에러메세지로 변경
//        ResultDto resultDto = member != null ? handleChangeMemberLevel(member, msg) : buildChangeMemberLevel(msg);
//        return resultDto;
//    }
//
//    private ResultDto handleChangeMemberLevel(Member member, String msg) {
//        Long memberSeq = member.getMemSeq();
//        MpMemRole mpMemRole = memberRoleRepository.findByMemSeq(memberSeq).orElseThrow(()->new RuntimeException());
//        mpMemRole.enabledMemberLevel();
//        memberRoleRepository.save(mpMemRole);
//        msg = "회원 활성화 성공했습니다.";
//        ResultDto resultDto = buildChangeMemberLevel(msg);
//        return resultDto;
//    }
//
//    private boolean isVerify(String email, String certificationNumber) {
//        boolean validatedEmail = isEmailExists(email);
//        if (!isEmailExists(email)) {
//            throw new RuntimeException("해당 이메일이 존재하지않습니다."); //수정필요 위와 같음
//        }
//        return (validatedEmail &&
//                verificationCodeDao.getVerificationCode(email).equals(certificationNumber));
//    }
//
//    private boolean isEmailExists(String email) {
//        return verificationCodeDao.hasKey(email);
//    }
//
//    public void  sendTemporaryPassword(String memberEmail, String newPassword){
//        String DOMAIN = EmailConstant.LOCAL_DOMAIN;
//        String title = "임시 비밀번호";
//        String txt = newPassword;
//        sendMail(memberEmail, title, txt);
//
//    }
//
//
//    //메일 보내기 회원 가입시 인증 , 비밀번호 찾기 시 임시 비밀 번호 보내주기.
//    public void sendMail(String toEmail, String title, String txt) {
//        SimpleMailMessage emailForm = createEmailForm(toEmail, title, txt);
//        try {
//            javaMailSender.send(emailForm);
//        } catch (RuntimeException e) {
//            e.printStackTrace();
//            throw new RuntimeException("New Exception");
//        }
//    }
//
//    //비밀번호 찾기, 아이디 회원가입 인증
//    private SimpleMailMessage createEmailForm(String toEmail, String title, String txt) {
//        SimpleMailMessage mailForm = new SimpleMailMessage();
//        mailForm.setTo(toEmail);
//        mailForm.setSubject(title);
//        mailForm.setText(txt);
//        return mailForm;
//    }
//
//    private ResultDto handlesignUpByVerificationCodeMap(EmailVerificationResponse emailVerificationResponse) {
//        HashMap<String, Object> resultMap = new HashMap<>();
//        resultMap.put("emailVerificationResponse", emailVerificationResponse);
//        String msg = "인증 링크 전송 성공";
//        return handleResultDto(msg, resultMap);
//    }
//
//    private ResultDto handleResultDto(String msg, HashMap<String, Object> map) {
//        ResultDto resultDto = new ResultDto();
//        return resultDto
//                .builder()
//                .code(HttpStatus.OK.value())
//                .httpStatus(HttpStatus.OK)
//                .message(msg)
//                .data(map)
//                .build();
//    }
//
//    private ResultDto buildChangeMemberLevel(String msg) {
//        ResultDto resultDto = new ResultDto();
//        HashMap<String, Object> map = new HashMap<>();
//        resultDto
//                .builder()
//                .code(HttpStatus.OK.value())
//                .httpStatus(HttpStatus.OK)
//                .message(msg)
//                .data(map)
//                .build();
//        return resultDto;
//    }
//
//}
