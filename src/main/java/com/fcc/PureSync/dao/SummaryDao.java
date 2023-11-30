package com.fcc.PureSync.dao;

import com.fcc.PureSync.dto.ExerciseDto;
import com.fcc.PureSync.dto.SummaryDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SummaryDao {

    @Autowired
    SqlSessionTemplate sm;

    public List<SummaryDto> getBodyBase(SummaryDto summaryDto) {
        return  sm.selectList("getBodyBase", summaryDto );
    }

}
