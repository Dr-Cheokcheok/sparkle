package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.service.BagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class bagController {
    @Autowired
    private BagService bagService;

    @PostMapping("/bag/add")
    @ResponseBody
    public String addCartPOST(BagDto cart, HttpServletRequest request){

        HttpSession session = request.getSession();
        BagVO bvo = (BagVO)session.getAttribute("bag");
        if (bvo == null) {
            return "1";
        }

        return null;
    }

    @PostMapping("/bag/delete")
    public String deleteBagPOST(BagDto bag) {

        bagService.deleteBag(bag.getProduct_id());

        return "redirect:/bag/" + bag.getUser_id();
    }
}
