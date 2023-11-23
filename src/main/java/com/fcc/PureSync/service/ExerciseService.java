package com.fcc.PureSync.service;


import com.fcc.PureSync.dao.ExerciseDao;
import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.entity.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    ExerciseDao exerciseDao;

    public List<ExerciseDto> getExerciseAllList( ExerciseDto exerciseTo) {
        return exerciseDao.getExerciseList(exerciseTo);
    }

}
