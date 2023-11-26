package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.MdTrashResponseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.MdTrash;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.MdTrashRepository;
import com.fcc.PureSync.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MdTrashService {
    private final MdTrashRepository mdTrashRepository;
    private final MemberRepository memberRepository;

    public ResultDto getMdTrashList(String memId) {
        Member member = memberRepository.findByMemId(memId).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        List<MdTrash> mdTrashList =  mdTrashRepository.findAllByMemberAndTsStatusOrderByTsWdateDesc(member, true);
        List<MdTrashResponseDto> mdTrashResponseDtoList = mdTrashList.stream().map(e -> entityToDto(e)).toList();
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdTrashList", mdTrashResponseDtoList);

        return buildResultDto(200, HttpStatus.OK, "success", data);
    }

    private MdTrashResponseDto entityToDto(MdTrash mdTrash) {
        return MdTrashResponseDto.builder()
                .tsContents(mdTrash.getTsContents())
                .build();
    }

    public ResultDto buildResultDto(int code, HttpStatus httpStatuss, String message, HashMap<String, Object> data) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(httpStatuss)
                .message(message)
                .data(data)
                .build();
    }



}
