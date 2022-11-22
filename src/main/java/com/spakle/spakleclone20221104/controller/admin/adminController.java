package com.spakle.spakleclone20221104.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class adminController {

    @GetMapping("/addition")
    public String loadAdmin() {return "admin/admin-page";}

    @GetMapping("/inquiry/{category}")
    public String loadInquiryWater() {return "admin/inquiry";}

    @GetMapping("/product/{productId}")
    public String loadModification(@PathVariable int productId){
        return "admin/admin-modification";
        //이 페이지에서 온로드될때 -> ajax 제품 정보 요청 보내서 받아서 보여주기
    }

}
