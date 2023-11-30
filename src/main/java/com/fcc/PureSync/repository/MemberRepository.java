package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemSeq(Long memId);
    Optional<Member> findByMemId(String id);

    Optional<Member> findByMemNick(String memNick);
    Optional<Member> findByMemEmail(String memEmail);


}