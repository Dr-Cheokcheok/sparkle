package com.spakle.spakleclone20221104.controller.security_test;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
@Log4j2
public class SecurityController {
    /*메인 페이지*/
    @GetMapping("/index")
    public String index() {
        log.info("index");
        return "index";
    }
    /*회원가입 페이지*/
    @GetMapping("/signup")
    public String dispSignup() {
        log.info("dispSignup: /signup");
        return "signup";
    }
    /*회원가입 처리*/
    @PostMapping("/signup")
    public String execSignup() {
        log.info("exeSignup:/signup");
        return "redirect:/secu/user/login";
    }
    /*로그인 페이지*/
    @GetMapping("/login")
    public String dispLogin() {
        log.info("dispLogin");
        return "login";
    }
    /*로그인 결과 페이지*/
    @GetMapping("/login/result")
    public String dispLoginResult() {
        log.info("dispLoginResult");
        return "login_success";
    }
    /*로그아웃 페이지*/
    @GetMapping("/logout/result")
    public String dispLogoutResult() {
        log.info("dispLogoutResult");
        return "logout";
    }
    @GetMapping("/info")
    public String dispInfo() {
        log.info("dispInfo");
        return "info";
    }
    @GetMapping("/admin")
    public String dispAdmin() {
        log.info("dispAdmin");
        return "admin";
    }
}
