package com.fcc.PureSync.repository;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Visitor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;

import java.util.HashMap;

public interface VisitorRepository extends JpaRepository <Visitor, Long> {
    Visitor findByVisitorDateAndVisitorIp(String visitorDate, String visitorIp);
}

