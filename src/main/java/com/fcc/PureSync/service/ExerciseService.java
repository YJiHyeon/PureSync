package com.fcc.PureSync.service;


import com.fcc.PureSync.dao.ExerciseDao;
import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Exercise;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseDao exerciseDao;
    private final ExerciseRepository exerciseRepository;

    public ResultDto getExerciseAllList(ExerciseDto exerciseTo) {
        if (exerciseTo.getMem_seq() == null ) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_SEQ);
        }
        if (exerciseTo.getEl_date() == null ) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_DATE);
        }

        List<ExerciseDto> exerciseList = exerciseDao.getExerciseList(exerciseTo);
        // 잘못된 seq 전달
        if (exerciseList.isEmpty()) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_EXERCISE);
        }

        try {
            HashMap<String, Object> data = new HashMap<>();
            data.put("exerciseList", exerciseList);
            String msg = "운동 불러오기에 성공했습니다.";
            return ResultDto.builder()
                    .code( HttpStatus.OK.value() )
                    .httpStatus( HttpStatus.OK )
                    .data( data )
                    .message( msg )
                    .build();
        } catch ( CustomException e ) {
            throw new CustomException( CustomExceptionCode.USER_ROLE_NOT_EXIST );     // 권한X
        }
    }

    @Transactional
    public ResultDto insertExercise( Exercise exercise ) {
        return performExerciseOperation( exercise, "운동 입력에 성공했습니다.", CustomExceptionCode.INSERT_FAIL );
    }

    @Transactional
    public ResultDto updateExercise( Exercise exercise ) {
        return performExerciseOperation( exercise, "운동 수정에 성공하였습니다.", CustomExceptionCode.UPDATE_FAIL );
    }

    @Transactional
    public ResultDto deleteExercise( Exercise exercise ) {
        return performExerciseOperation( exercise, "운동 삭제에 성공하였습니다.", CustomExceptionCode.DELETE_FAIL );
    }


    private ResultDto performExerciseOperation( Exercise exercise, String successMessage, CustomExceptionCode exceptionCode ) {
        if ( exercise.getMemSeq() == null ) {
            throw new CustomException( CustomExceptionCode.NOT_FOUND_USER );
        }
        try {
            if ( exceptionCode == CustomExceptionCode.DELETE_FAIL ) {
                // 삭제 작업 수행
                exerciseRepository.delete( exercise );
            } else {
                // 추가 또는 수정 작업 수행
                exerciseRepository.save( exercise );
            }

            HashMap<String, Object> map = new HashMap<>();
            map.put( "exercise", exercise );

            return ResultDto.builder()
                    .code( HttpStatus.OK.value() )
                    .httpStatus( HttpStatus.OK )
                    .message( successMessage )
                    .data( map )
                    .build();

        } catch (CustomException e) {
            throw new CustomException( exceptionCode );
        }
    }

}
