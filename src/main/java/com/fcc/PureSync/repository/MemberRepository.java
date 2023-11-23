package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemId(String memId);
    Optional<Member> findByMemNick(String memNick);
    Optional<Member> findByMemEmail(String memEmail);
}