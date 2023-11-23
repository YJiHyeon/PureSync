package com.fcc.PureSync.service;

import com.fcc.PureSync.dao.MenuDao;
import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Menu;
import com.fcc.PureSync.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuDao menuDao;
    private final MenuRepository menuRepository;

    public ResultDto getMenuAllList( MenuDto menuTo ) {
        ResultDto resultDto =null;

        List<MenuDto> menuList = menuDao.getMenuList(menuTo);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put( "data", menuList );

        resultDto = ResultDto.builder()
                .data(map)
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto insertMenu( Menu menu ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg="";

        try {
            menuRepository.save( menu );
            msg="성공";
        } catch( Exception exception ) {
            msg="";
        }

        resultDto =  ResultDto.builder()
                .message( msg )
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto updateMenu( Menu menu ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg = "";

        try {
            menuRepository.save( menu );
            msg="성공";
        } catch(Exception exception) {
            msg="";
        }

        resultDto =  ResultDto.builder()
                .message( msg )
                .build();

        return resultDto;
    }

    @Transactional
    public  ResultDto deleteMenu( Menu menu ) {
        ResultDto resultDto = null;
        HashMap<String, Object>map = new HashMap<String, Object>();
        String msg = "";

        try {
            menuRepository.delete( menu );
            msg="성공";
        } catch( Exception exception ) {
            msg="";
        }

        resultDto = ResultDto.builder()
                .message( msg )
                .build();

        return resultDto;
    }
}
