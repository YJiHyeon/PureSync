package com.fcc.PureSync.service;


import com.fcc.PureSync.dao.ExerciseDao;
import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Exercise;
import com.fcc.PureSync.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        ResultDto resultDto = null;

        List<ExerciseDto> exerciseList = exerciseDao.getExerciseList(exerciseTo);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put( "data" , exerciseList );

        resultDto = ResultDto.builder()
                .data(map)
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto insertExercise( Exercise exercise ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg="";

        try {
            exerciseRepository.save( exercise );
            msg="성공";
        } catch( Exception exception ) {
            msg="";
        }

        resultDto = ResultDto.builder()
                .message(msg)
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto updateExercise( Exercise exercise ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg = "";

        try {
            exerciseRepository.save( exercise );
            msg = "성공";
        } catch( Exception exception ) {
            msg = "";
        }

        resultDto = ResultDto.builder()
                .message(msg)
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto deleteExercise( Exercise exercise ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg = "";

        try {
            exerciseRepository.delete( exercise );
            msg = "성공";
        } catch( Exception exception ) {
            msg="";
        }

        resultDto = ResultDto.builder()
                .message( msg )
                .build();

        return resultDto;
    }

}
