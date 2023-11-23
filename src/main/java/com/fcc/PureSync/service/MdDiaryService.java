package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.DiaryResponseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.MdDiary;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.repository.MdDiaryRepository;
import com.fcc.PureSync.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MdDiaryService {
    private final MdDiaryRepository mdDiaryRepository;
    private final MemberRepository memberRepository;

    public ResultDto getMdDiaryList(String memId, Pageable pageable) {
        Member member = memberRepository.findByMemId(memId);
        List<MdDiary> mdDiaryEntityList =  mdDiaryRepository.findAllByMemberOrderByDyDateDesc(member, pageable);
        List<DiaryResponseDto> mdDiaryDtoList =  mdDiaryEntityList.stream().map(e -> new DiaryResponseDto().toDto(e)).toList();
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiaryList", mdDiaryDtoList);

        ResultDto resultDto =
                ResultDto.builder()
                        .code(HttpStatus.OK.value())
                        .httpStatus(HttpStatus.OK)
                        .message("Success")
                        .data(data)
                        .build();

        return resultDto;
    }
}
