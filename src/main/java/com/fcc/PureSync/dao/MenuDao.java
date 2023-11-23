package com.fcc.PureSync.dao;

import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.entity.Menu;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MenuDao {
    @Autowired
    SqlSessionTemplate sm;

    public List<MenuDto> getMenuList( MenuDto menuTo ) {
        List<MenuDto> list = sm.selectList("getMenuAllList", menuTo );
        System.out.println(list.size());
        for(int i=0; i<list.size(); i++)
        {
            System.out.println(list.get(i));
        }
        return  list;
    }
}
