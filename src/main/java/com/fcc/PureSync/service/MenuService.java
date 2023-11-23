package com.fcc.PureSync.service;

import com.fcc.PureSync.dao.MenuDao;
import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.entity.Menu;
import com.fcc.PureSync.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    MenuDao menuDao;

    @Autowired
    MenuRepository menuRepository;

    public List<MenuDto> getMenuAllList( MenuDto menuTo ) {
        return menuDao.getMenuList(menuTo);
    }

    public  void insertMenu( Menu menu ) {
        menuRepository.save(menu);
    }

    public  void updateMenu( Menu menu ) {
        System.out.println("update menu >>>  " + menu.getMenuSeq());

        //menu.getMenuSeq()
        menuRepository.save(menu);
    }

    public  void deleteMenu( Menu menu ) {
        System.out.println("delete menu >>>  " + menu.getMenuSeq());

        //menu.getMenuSeq()
        menuRepository.delete(menu);
    }
}
