package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class logInController {

    @GetMapping("/login")
    public String loadlogin() {return "account/login";}

    @GetMapping("/register")
    public String loadregister() {return "account/register";}

    @GetMapping("/forgot")
    public String loadforgot() {return "account/forgot";}

    @GetMapping("/order")
    public String loadorder() {return "order/order";}

}

