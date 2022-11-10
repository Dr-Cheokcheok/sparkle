package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/mypage/delivery")
    public String loadDelivery() {
        return "mypage/delivery";
    }

    @GetMapping("/mypage/edit")
    public String loadEdit() {
        return "mypage/edit";
    }
}
