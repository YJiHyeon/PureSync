package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long boardSeq);

    Page<Board> findAll(Pageable pageable);

}
