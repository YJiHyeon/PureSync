package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.MdDiary;
import com.fcc.PureSync.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface MdDiaryRepository extends JpaRepository <MdDiary, Long> {
    List<MdDiary> findAllByMemberOrderByDyDateDesc(Member member, Pageable pageable);

}
