package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.TestAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestAnswerRepository extends JpaRepository<TestAnswer,Long> {
    TestAnswer findByMemberAndAnsInfo(Member member, Integer ansInfo);
}
