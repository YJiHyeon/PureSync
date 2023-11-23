package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Menu;

import com.fcc.PureSync.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping( value = "/api/menu" )
@RequiredArgsConstructor
public class MenuController {
    // 서비스에서 예외처리

    private final MenuService menuService;

    @GetMapping("/list")
    public ResultDto getAllMenuList (@RequestBody  MenuDto menuTo ) {
        return  menuService.getMenuAllList(menuTo);
    }

    @PostMapping("/save")
    public ResultDto menuInsert( @RequestBody Menu menu ) {
        return menuService.insertMenu(menu);
    }

    @PutMapping("/update")
    public ResultDto menuUpdate( @RequestBody Menu menu ) {
        return menuService.updateMenu(menu);
    }

    @DeleteMapping ("/delete")
    public ResultDto menuDelete( @RequestBody Menu menu ) {
        return menuService.deleteMenu(menu);
    }


}
