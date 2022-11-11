package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MypageController {

    @GetMapping("/account")
    public String loadMyPage() {
        return "mypage/mypage";
    }

    @GetMapping("/account/order")
    public String loadOrderDelivery() {
        return "mypage/delivery";
    }

    @GetMapping("/account/likes")
    public String loadLikes() {
        return "mypage/likes";
    }

    @GetMapping("/users/edit")
    public String loadUserEdit() {
        return "mypage/edit";
    }

    @GetMapping("/users/delete")
    public String loadUserDelete() {
        return "mypage/userDelete";
    }

    @GetMapping("/account/order/detail")
    public String loadOrderDetail() {
        return "mypage/orderDetail";
    }

}
