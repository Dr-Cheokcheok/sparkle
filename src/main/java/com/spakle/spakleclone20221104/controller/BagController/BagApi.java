package com.spakle.spakleclone20221104.controller.BagController;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.service.BagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bag")
public class BagApi {

    private final BagService bagService;

    @PostMapping("/add")
    public ResponseEntity<?> bagAdd(@RequestBody BagDto bagDto) throws Exception{

        bagService.bagadd(bagDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1,"Successfully registered",bagDto));

    }



}
