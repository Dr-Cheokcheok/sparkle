package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*  */
@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class ShopApi {
    private final ShopService shopService;


}
