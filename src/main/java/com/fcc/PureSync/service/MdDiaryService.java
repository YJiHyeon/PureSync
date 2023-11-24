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
import org.hibernate.sql.Update;
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
                        .message("success")
                        .data(data)
                        .build();

        return resultDto;
    }

    public ResultDto getMdDiary(Long dySeq) {
        MdDiary mdDiary = mdDiaryRepository.findById(dySeq).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));
        if(!mdDiary.getDyStatus()) throw new CustomException(CustomExceptionCode.ALREADY_DELETED_ARTICLE);
        entityToDto(mdDiary);
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiary", mdDiary);

        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "success", data);

        return resultDto;
    }

    public ResultDto writeMdDiary(DiaryRequestDto dto) {
        MdDiary mdDiary = dtoToEntity(dto);
        mdDiaryRepository.save(mdDiary);
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiary", mdDiary);

        ResultDto resultDto = buildResultDto(201, HttpStatus.CREATED, "insert Complete", data);

        return resultDto;
    }

    public ResultDto updateMdDiray(Long dySeq, DiaryRequestDto dto) {
        MdDiary mdDiary = mdDiaryRepository.findById(dySeq).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));
        Emotion updatedEmotion = emotionRepository.findByEmoState(dto.getEmoState());
        MdDiary updatedMdDiary =
                MdDiary.builder()
                        .dySeq(mdDiary.getDySeq())
                        .dyDate(dto.getDyDate())
                        .dyTitle(dto.getDyTitle())
                        .dyContents(dto.getDyContents())
                        .dyStatus(true)
                        .emotion(updatedEmotion)
                        .member(mdDiary.getMember())
                        .build();

        mdDiaryRepository.save(updatedMdDiary);
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiary", updatedMdDiary);
        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "update Complete", data);

        return resultDto;
    }

    public ResultDto deleteMdDiary(Long dySeq) {
        MdDiary mdDiary = mdDiaryRepository.findById(dySeq).orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_ARTICLE));
        MdDiary deletedMdDiary =
                MdDiary.builder()
                        .dySeq(mdDiary.getDySeq())
                        .dyDate(mdDiary.getDyDate())
                        .dyTitle(mdDiary.getDyTitle())
                        .dyContents(mdDiary.getDyContents())
                        .dyStatus(false)
                        .emotion(mdDiary.getEmotion())
                        .member(mdDiary.getMember())
                        .build();

        mdDiaryRepository.save(deletedMdDiary);
        HashMap<String, Object> data = new HashMap<>();
        data.put("mdDiary", deletedMdDiary);
        ResultDto resultDto = buildResultDto(200, HttpStatus.OK, "delete Complete", data);

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

    //ResultDto 빌더
    public ResultDto buildResultDto(int code, HttpStatus httpStatuss, String message, HashMap<String, Object> data) {
        return ResultDto.builder()
                .code(code)
                .httpStatus(httpStatuss)
                .message(message)
                .data(data)
                .build();
    }


}