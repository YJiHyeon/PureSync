package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemId(String memId);
    Member findByMemNick(String memNick);
    Member findByMemEmail(String memEmail);
}