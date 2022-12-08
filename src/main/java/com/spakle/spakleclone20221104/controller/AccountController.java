package com.spakle.spakleclone20221104.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
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
    public String loadLogin(HttpServletRequest request, @RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "exception", required = false) String exception, Model model) {
        model.addAttribute("error", error);
        model.addAttribute("exception", exception);

        String uri = request.getHeader("Referer");
        if (uri != null && !uri.contains("/login")) {
            request.getSession().setAttribute("prevPage", uri);
        }
        log.info("loginForm view resolve");
        return "account/login";
    }

    @GetMapping("/register")
    public String loadRegister() {return "account/register";}

    @GetMapping("/forgot")
    public String loadForgot() {return "account/forgot";}

}

