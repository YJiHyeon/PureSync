package com.fcc.PureSync.service;

import com.fcc.PureSync.dto.DiaryRequestDto;
import com.fcc.PureSync.dto.DiaryResponseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Emotion;
import com.fcc.PureSync.entity.MdDiary;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.EmotionRepository;
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
    private final EmotionRepository emotionRepository;
    private final MemberRepository memberRepository;

    public ResultDto getMdDiaryList(String memId, Pageable pageable) {
        Member member = memberRepository.findByMemId(memId).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));
        List<MdDiary> mdDiaryEntityList =  mdDiaryRepository.findAllByMemberOrderByDyDateDesc(member, pageable);
        List<DiaryResponseDto> mdDiaryDtoList =  mdDiaryEntityList.stream().map(e -> entityToDto(e)).toList();
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

    public ResultDto writeMdDiary(DiaryRequestDto dto){
        MdDiary mdDiary = dtoToEntity(dto);
        mdDiaryRepository.save(mdDiary);
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiary", mdDiary);
        ResultDto resultDto = ResultDto.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("Success")
                .data(data)
                .build();

        return resultDto;
    }


    //mdDiary entity -> dto 변환
    public DiaryResponseDto entityToDto(MdDiary mdDiary) {
        return DiaryResponseDto.builder()
                .dyDate(mdDiary.getDyDate())
                .dyTitle(mdDiary.getDyTitle())
                .dyContents(mdDiary.getDyContents())
                .emoState(mdDiary.getEmotion().getEmoState())
                .build();
    }

    //mdDiary dto -> entity 변환
    public MdDiary dtoToEntity(DiaryRequestDto dto) {
        Emotion dtoEmotion = emotionRepository.findByEmoState(dto.getEmoState());
        System.out.println(dto.getMemId());
        Member dtoMember = memberRepository.findByMemId(dto.getMemId()).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        return MdDiary.builder()
                .dyDate(dto.getDyDate())
                .dyTitle(dto.getDyTitle())
                .dyContents(dto.getDyContents())
                .dyStatus(true)
                .emotion(dtoEmotion)
                .member(dtoMember)
                .build();
    }
}
