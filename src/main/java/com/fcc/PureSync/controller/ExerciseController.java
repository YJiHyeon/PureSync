package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Exercise;
import com.fcc.PureSync.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( value = "/api/exercise" )
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping("/list")
    public ResultDto getAllExerciseList ( @RequestBody ExerciseDto exerciseTo ) {
        return exerciseService.getExerciseAllList(exerciseTo);
    }

    @PostMapping("/save")
    public  ResultDto exerciseInsert ( @RequestBody Exercise exercise ) {
        return exerciseService.insertExercise(exercise);
    }

    @PutMapping ("/update")
    public  ResultDto exerciseUpdate( @RequestBody Exercise exercise ) {
        return exerciseService.updateExercise(exercise);
    }

    @DeleteMapping("/delete")
    public  ResultDto exerciseDelete ( @RequestBody Exercise exercise ) {
        return exerciseService.deleteExercise(exercise);
    }

}
