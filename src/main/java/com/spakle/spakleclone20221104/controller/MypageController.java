package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class MypageController {

    @GetMapping("/account")
    public String loadMyPage(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        return "mypage/mypage";
    }

    @GetMapping("/account/order")
    public String loadOrderDelivery(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        return "mypage/delivery";
    }

    @GetMapping("/account/likes")
    public String loadLikes(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        return "mypage/likes";
    }

    @GetMapping("/users/edit")
    public String loadUserEdit(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        if(principalDetails.getUser().getEvent_sosick() == 1){
            model.addAttribute("eventSosick",true);
        }else{
            model.addAttribute("noSosick",true);
        }
        return "mypage/edit";
    }

    @GetMapping("/users/delete")
    public String loadUserDelete(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        return "mypage/userDelete";
    }

    @GetMapping("/account/order/detail")
    public String loadOrderDetail(Model model, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("principalUser",principalDetails.getUser());
        return "mypage/orderDetail";
    }

}
