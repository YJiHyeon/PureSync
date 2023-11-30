package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Positive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PositiveRepository extends JpaRepository<Positive, Long> {

}
