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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private final BagService bagService;
    //제품 한개
    @GetMapping("")
    public String loadOrder(Model model, OrderReqDto orderReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails)throws Exception{

        model.addAttribute("orderList", orderReqDto);
        model.addAttribute("principalUser",principalDetails.getUser());

        return "order/order";
    }

    //장바구니 매핑
    @PostMapping("/bagall")
    public String bagAll(Model model,@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
        User user = principalDetails.getUser();

        model.addAttribute("orderList",bagService.getOrderList(user.getId()));
        model.addAttribute("principalUser", principalDetails.getUser());

        return "order/order";
    }
    @PostMapping("/bagselect")
    public String bagSelect(Model model,@AuthenticationPrincipal PrincipalDetails principalDetails,
                            String checkArr) throws Exception{

        User user = principalDetails.getUser();

        model.addAttribute("orderList",bagService.getChkOrderList(user.getId(),checkArr));
        model.addAttribute("principalUser", principalDetails.getUser());

        return "order/order";
    }
}
