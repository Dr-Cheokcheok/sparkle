package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
import com.spakle.spakleclone20221104.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class CartController {
    @RequestMapping(value = "/bag/{productId}")
    public @ResponseBody String addInCart(@PathVariable("productId")String productId, HttpSession session) {

        User user = (User) session.getAttribute("login");
        String username = user.getUsername();

        ShopListRespDto shopListRespDto = new ShopListRespDto();

        shopListRespDto.setName(username);
        shopListRespDto.setProductId(Integer.parseInt(productId));


        return username;
    }

}
