package com.spakle.spakleclone20221104.controller;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.service.BagService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/shop/bag")
public class bagController {
    @JacksonInject
    @Autowired
    private BagService bagService;


    @RequestMapping("insert")
    public String insert(@ModelAttribute BagVO vo, HttpSession session) throws Exception {
        int user_id = (int) session.getAttribute("user_id");
        vo.setUser_id(user_id);
        /* 장바구니에 기존 상품이 있는지 검사 */
        int count = bagService.countBag(vo.getProduct_id(), user_id);
        if (count == 0) {
            bagService.updateBag(vo);
        } else {
            bagService.insert(vo);
        }

        if (count == 0) {
            bagService.insert(vo);
        }else {
            bagService.updateBag(vo);
        }
        return "redirect:/shop/bagList";
    }

    @RequestMapping("bagList")
    public ModelAndView list(HttpSession session, ModelAndView mav){
        int user_id = (int) session.getAttribute("user_id");
        Map<String, Object> map = new HashMap<String, Object>();
        List<BagVO> list = bagService.listBag(user_id);
        int sumMoney = bagService.sumMoney(user_id);
        map.put("list", list);
        map.put("count", list.size());
        map.put("allSum", sumMoney);
        mav.setViewName("shop/bag");
        mav.addObject("map", map);
        return mav;
    }
    @RequestMapping("delete")
    public String delete(@RequestParam int bagId){
        bagService.delete(bagId);
        return "redirect:/shop/bag/list";
    }
    @RequestMapping("updateBag")
    public String update(@RequestParam int[] count, @RequestParam int[] product_id, HttpSession session) {
        int user_id = (int) session.getAttribute("user_id");
        for(int i = 0; i < product_id.length; i++) {
            BagVO vo = new BagVO();
            vo.setUser_id(user_id);
            vo.setCount(count[i]);
            vo.setProduct_id(product_id[i]);
            bagService.modifyBag(vo);
        }
        return "redirect:/shop/bagList";
    }

}
