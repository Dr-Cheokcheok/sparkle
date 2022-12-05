package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.controller.BagController.BagApi;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderItemDto;
import com.spakle.spakleclone20221104.dto.order.OrderReqDto;
import com.spakle.spakleclone20221104.service.BagService;
import com.spakle.spakleclone20221104.service.ProductService;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/order")
public class OrderController {

    //제품 한개
    @GetMapping("")
    public String loadOrder(Model model, OrderReqDto orderReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails)throws Exception{
//        List<orderReqDto> list = new ArrayList<>();
        model.addAttribute("order", orderReqDto);
        model.addAttribute("principalUser",principalDetails.getUser());

        return "order/order";
    }

    //장바구니 매핑
//    @GetMapping("/bagall")
//    public String loadOrder(Model model,@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
//        User user = principalDetails.getUser();
//
//
//
////        model.addAttribute("order","");
////        model.addAttribute("principalUser", principalDetails.getUser());
//
//
//        return "order/order";
//    }
}
