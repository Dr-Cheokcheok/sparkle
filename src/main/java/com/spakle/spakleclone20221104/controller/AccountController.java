package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class AccountController {

    @RequestMapping(value = "/favicon.ico", method = RequestMethod.GET)
    public void favicon(HttpServletRequest request, HttpServletResponse response){
        try {
            response.sendRedirect("/resources/favicon.ico");
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/login")
    public String loadlogin() {return "account/login";}

    @GetMapping("/register")
    public String loadregister() {return "account/register";}

    @GetMapping("/forgot")
    public String loadforgot() {return "account/forgot";}

    @GetMapping("/order")
    public String loadorder() {return "order/order";}

}

