package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.aop.annotation.LogAspect;
import com.spakle.spakleclone20221104.dto.OrderReqDto;
import com.spakle.spakleclone20221104.security.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/order")
public class OrderController {

    @LogAspect
    @GetMapping("")
    public String loadOrder(Model model, OrderReqDto orderReqDto,
                            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        model.addAttribute("order", orderReqDto);
        model.addAttribute("principalUser", principalDetails.getUser());
        return "order/order";
    }
}