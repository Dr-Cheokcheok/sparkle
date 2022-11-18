package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class adminController {

    @GetMapping("/addition")
    public String loadAdmin() {return "admin/admin-page";}

    @GetMapping("/inquiry/water")
    public String loadInquiryWater() {return "admin/inquiry-water";}

    @GetMapping("/inquiry/spakle")
    public String loadInquirySpakle() {return "admin/inquiry-spakle";}

    @GetMapping("/inquiry/waterSub")
    public String loadInquiryWaterSub() {return "admin/inquiry-water-sub";}

}
