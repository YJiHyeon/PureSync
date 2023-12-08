package com.fcc.PureSync.repository;

import com.fcc.PureSync.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VisitorRepository extends JpaRepository <Visitor, Long> {
    Visitor findByVisitorDateAndVisitorIp(String visitorDate, String visitorIp);
}

