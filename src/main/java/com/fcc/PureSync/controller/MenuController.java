package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.entity.Menu;

import com.fcc.PureSync.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping( value = "/api/menu" )
public class MenuController {
    // 서비스에서 예외처리

    @Autowired
    MenuService menuService;

    @GetMapping("/list")
    public HashMap< String, Object >  getAllMenuList( @RequestBody  MenuDto menuTo ) {
        HashMap< String, Object > map = new HashMap<>();
        map.put("result","success");
        map.put( "data", menuService.getMenuAllList(menuTo) );
        return  map;
    }

    @PostMapping("/save")
    public HashMap< String, Object > save( @RequestBody Menu menu ) {
        HashMap< String, Object > map = new HashMap<>();
        menuService.insertMenu(menu);
        map.put("result","success");
        map.put("data", menu );
        return map;
    }

    @PostMapping("/update")
    public HashMap< String, Object > update( @RequestBody Menu menu ) {
        HashMap< String, Object > map = new HashMap<>();
        menuService.updateMenu(menu);
        map.put("result","success");
        map.put("data", menu );
        return map;
    }

    @PostMapping("/delete")
    public HashMap< String, Object > delete( @RequestBody Menu menu ) {
        HashMap< String, Object > map = new HashMap<>();
        menuService.deleteMenu(menu);
        map.put("result","success");
        map.put("data", menu );
        return map;
    }


}
