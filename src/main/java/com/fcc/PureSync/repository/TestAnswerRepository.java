package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.TestAnswer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestAnswerRepository extends JpaRepository<TestAnswer,Long> {
    List<TestAnswer> findByMember_MemSeqAndTestSeq(Long memSeq, Long testSeq, Pageable pageable);
}
