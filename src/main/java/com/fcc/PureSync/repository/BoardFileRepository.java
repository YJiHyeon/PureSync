package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {


    Optional<BoardFile> findByBoard_BoardSeq(Long aLong);
}
