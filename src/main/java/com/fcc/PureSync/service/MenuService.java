package com.fcc.PureSync.service;

import com.fcc.PureSync.dao.MenuDao;
import com.fcc.PureSync.dto.MenuDto;
import com.fcc.PureSync.dto.MenuResponseDto;
import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.entity.Food;
import com.fcc.PureSync.entity.Member;
import com.fcc.PureSync.entity.Menu;
import com.fcc.PureSync.exception.CustomException;
import com.fcc.PureSync.exception.CustomExceptionCode;
import com.fcc.PureSync.repository.FoodRepository;
import com.fcc.PureSync.repository.MemberRepository;
import com.fcc.PureSync.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuDao menuDao;
    private final MenuRepository menuRepository;
    private final FoodRepository foodRepository;
    private final MemberRepository memberRepository;

    public ResultDto getAllFoods( String foodName ) {
        try {
        List<Food> allFoods = foodRepository.findAllFood(foodName);
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("allFoods", allFoods);
        ResultDto resultDto =  ResultDto.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .data(data)
                .build();
        return resultDto;
        } catch (CustomException e) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_MENU);  // 권한X
        }
    }

    public ResultDto getMenuAllList( MenuDto menuTo, Long memSeq  ) {
        menuTo.setMem_seq(memSeq);
        List<MenuDto> menuList= menuDao.getMenuList(menuTo);
        try {
            HashMap<String, Object> data = new HashMap<String, Object>();
            data.put("menuList", menuList);
            ResultDto resultDto =  ResultDto.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .data(data)
                    .build();
            System.out.println(resultDto.getData().get("menuList"));

            return resultDto;
        } catch (CustomException e) {
            throw new CustomException(CustomExceptionCode.NOT_FOUND_MENU);  // 권한X
        }
    }

    @Transactional
    public ResultDto insertMenu( MenuResponseDto menuResponseDto, Long memSeq ) {
        Member member = memberRepository.findByMemSeq(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        Food food = foodRepository.findByFoodSeq(menuResponseDto.getFoodSeq())
                .orElseThrow(()->new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        Menu menu = Menu.builder()
                .menuWhen(menuResponseDto.getMenuWhen())
                .menuDate(menuResponseDto.getMenuDate())
                .menuGram(menuResponseDto.getMenuGram())
                .member(member)
                .food(food)
                .build();

        return performMenuOperation( menu, "식단 입력에 성공했습니다.", CustomExceptionCode.INSERT_FAIL );
    }

//    @Transactional
//    public ResultDto updateMenu( Menu menu, Long memSeq ) {
//        return performMenuOperation( menu, "식단 수정에 성공했습니다.", CustomExceptionCode.UPDATE_FAIL );
//    }

    @Transactional
    public ResultDto deleteMenu( MenuResponseDto menuResponseDto, Long memSeq ) {
        Member member = memberRepository.findByMemSeq(memSeq)
                .orElseThrow(() -> new CustomException(CustomExceptionCode.NOT_FOUND_USER));

        Menu menu = Menu.builder()
                .menuSeq(menuResponseDto.getMenuSeq())
                .member(member)
                .build();

        return performMenuOperation( menu, "식단 삭제에 성공했습니다.", CustomExceptionCode.DELETE_FAIL );
    }

    private ResultDto performMenuOperation( Menu menu, String successMessage, CustomExceptionCode exceptionCode ) {
/*        System.out.println( "mem_seq>>>>>>>> " + menu.getMemSeq() );
        if ( menu.getMemSeq() == null ) {
            throw new CustomException( CustomExceptionCode.NOT_FOUND_USER );
        }*/
        try {
            if( exceptionCode == CustomExceptionCode.DELETE_FAIL ) {
                menuRepository.delete( menu );
            } else {
                menuRepository.save( menu );
            }

            HashMap<String, Object> map = new HashMap<>();
            map.put( "menu", menu );

            return  ResultDto.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message(successMessage)
                    .data(map)
                    .build();

        } catch (CustomException e) {
            throw new CustomException(exceptionCode);
        }
    }

}