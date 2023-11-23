package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Exercise;
import com.fcc.PureSync.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
