package com.spakle.spakleclone20221104.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public String loadLogin() {return "account/login";}

    @GetMapping("/register")
    public String loadRegister() {return "account/register";}

    @GetMapping("/forgot")
    public String loadForgot() {return "account/forgot";}

//    @GetMapping("/order")
//    public String loadOrder() {return "order/order";}

    @GetMapping("/order/{productId}/{quantity}")
    public String loadOrder(@PathVariable int productId, @PathVariable int quantity) {return "order/order";}
}

