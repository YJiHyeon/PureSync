package com.fcc.PureSync.controller;

import com.fcc.PureSync.dto.ResultDto;
import com.fcc.PureSync.service.MdTrashService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mind/trash")
public class MdTrashController {
    private final MdTrashService mdTrashService;

    @GetMapping("/list/{memId}")
    public ResultDto getMdTrashList(@PathVariable String memId) {
        return mdTrashService.getMdTrashList(memId);
    }
}
