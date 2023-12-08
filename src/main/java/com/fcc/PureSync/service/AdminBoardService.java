package com.fcc.PureSync.service;
import com.fcc.PureSync.dao.AdminBoardDao;
import com.fcc.PureSync.dto.AdminBoardDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminBoardService {

    private final AdminBoardDao adminBoardDao;

    // 유저 게시판 리스트
    public List<AdminBoardDto> getAllUserBoardList (AdminBoardDto adminBoardDto) {
        return  adminBoardDao.getAllUserBoardList(adminBoardDto);
    }

    public int getBoardTotalcnt() {
        return adminBoardDao.getBoardTotalcnt();
    }

    public int getCmtTotalcnt() {
        return adminBoardDao.getCmtTotalcnt();
    }

    public List<AdminBoardDto> getAllBoardFiles (AdminBoardDto adminBoardDto) {
        return  adminBoardDao.getAllFiles( adminBoardDto );
    }

    // 유저 댓글 리스트
    public List<AdminBoardDto> getAllUserCmtList (AdminBoardDto adminBoardDto) {
        return  adminBoardDao.getAllUserCmtList(adminBoardDto);
    }

    // 유저 게시판 뷰
    public AdminBoardDto getUserBoardView (AdminBoardDto adminBoardDto) {
        System.out.println();
        return  adminBoardDao.getUserBoardView(adminBoardDto);
    }

    // 댓글 관리자 권한으로 삭제
    public void cmtSoftDelete ( AdminBoardDto adminBoardDto ) {
        adminBoardDao.cmtSoftDelete(adminBoardDto);
    }

    // 게시글 관리자 권한으로 삭제
    public void userBoardSoftDelete ( AdminBoardDto adminBoardDto ) {
        adminBoardDao.userBoardSoftDelete(adminBoardDto);
    }



}
