package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Board;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findById(Long boardSeq);

    Page<Board> findAll(Pageable pageable);

    Page<Board> findByBoardStatusOrderByBoardWdateDesc(boolean boardStatus,Pageable pageable);

    @Query("SELECT COUNT(a) FROM Likes a WHERE a.board = :board")
    Long countLikesByBoard(@Param("board") Board board);
}