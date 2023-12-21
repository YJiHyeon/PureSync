package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Positive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PositiveRepository extends JpaRepository<Positive, Long> {
//    List<Positive> findAll();

    @Query(value = "SELECT * FROM tb_positive ORDER BY RAND() LIMIT 1", nativeQuery = true)
    List<Positive> findAll();
}
