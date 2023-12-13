package com.fcc.PureSync.service;

import com.fcc.PureSync.dao.AdminQnaBoardDao;
import com.fcc.PureSync.dao.QnaCommentDao;
import com.fcc.PureSync.dto.AdminQnaBoardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminQnaBoardService {

    private final AdminQnaBoardDao adminQnaBoardDao;
    private final QnaCommentDao qnaCommentDao;

    // 유저 게시판 리스트
    public List<AdminQnaBoardDto> getAllQnaBoardList (AdminQnaBoardDto adminQnaBoardDto) {
        return  adminQnaBoardDao.getAllQnaBoardList(adminQnaBoardDto);
    }

    public int getQnaBoardTotalcnt(AdminQnaBoardDto adminQnaBoardDto) {
        return adminQnaBoardDao.getQnaBoardTotalcnt(adminQnaBoardDto);
    }

//    public int getQnaCmtTotalcnt(AdminQnaBoardDto adminQnaBoardDto) {
//        return adminQnaBoardDao.getQnaCmtTotalcnt(adminQnaBoardDto);
//    }

    public List<AdminQnaBoardDto> getAllQnaBoardFiles (AdminQnaBoardDto adminQnaBoardDto) {
        return  adminQnaBoardDao.getAllQnaFiles( adminQnaBoardDto );
    }

    // 유저 댓글 리스트
    public List<AdminQnaBoardDto> getAllQnaCmtList (AdminQnaBoardDto adminQnaBoardDto) {
        return  adminQnaBoardDao.getAllQnaCmtList(adminQnaBoardDto);
    }

    // 유저 게시판 뷰
    public AdminQnaBoardDto getQnaBoardView (AdminQnaBoardDto adminQnaBoardDto) {
        System.out.println();
        return  adminQnaBoardDao.getQnaBoardView(adminQnaBoardDto);
    }

    // 댓글 관리자 권한으로 삭제
    public void qnaCmtSoftDelete ( AdminQnaBoardDto adminQnaBoardDto ) {
        adminQnaBoardDao.qnaCmtSoftDelete(adminQnaBoardDto);
    }

    // 게시글 관리자 권한으로 삭제
    public void qnaBoardSoftDelete ( AdminQnaBoardDto adminQnaBoardDto ) {
        adminQnaBoardDao.qnaBoardSoftDelete(adminQnaBoardDto);
    }

    public void qnaCommentWrite(AdminQnaBoardDto adminQnaBoardDto) {
        qnaCommentDao.qnaCommentWrite(adminQnaBoardDto);
    }

    public void qnaCommentUpdate(AdminQnaBoardDto adminQnaBoardDto) {
        qnaCommentDao.qnaCommentUpdate(adminQnaBoardDto);
    }

//    public void qnaCommentDelete(AdminQnaBoardDto adminQnaBoardDto) {
//        qnaCommentDao.qnaCommentDelete(adminQnaBoardDto);
//    }

}
