package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.entity.Exercise;
import com.fcc.PureSync.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( value = "/api/exercise" )
public class ExerciseController {

    @Autowired
    ExerciseService exerciseService;

    @GetMapping("/list")
    public List<ExerciseDto> getAllExerciseList ( ExerciseDto exerciseTo ) {
        return exerciseService.getExerciseAllList(exerciseTo);
    }

}
