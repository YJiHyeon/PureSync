package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
    Optional<Member> findByMemSeq(Long memId);
    Optional<Member> findByMemId(String memId);
    Optional<Member> findByMemIdAndMemStatus(String memId, Integer memStatus);
    Optional<Member> findByMemNick(String memNick);
    Optional<Member> findByMemEmail(String email);

    Member findByMemSeqAndMemStatus(Long memSeq, Integer i);
}