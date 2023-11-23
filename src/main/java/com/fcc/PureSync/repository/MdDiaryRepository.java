package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.MdDiary;
import com.fcc.PureSync.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface MdDiaryRepository extends JpaRepository <MdDiary, Long> {
    List<MdDiary> findAllByMemberOrderByDyDateDesc(Member member, Pageable pageable);
}
