package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class LoginController {
    private final HttpSession session;

    @PostMapping("/login")
    public String login(User user){
        if (user != null){
            session.setAttribute("principal", user);
            return "index/index";
        }else {

        return "account/login";

        }
    }

//    @RequestMapping(value = "", method = RequestMethod.GET)
//    public void logout(HttpSession session, HttpServletResponse response)throws Exception{
//        session.invalidate();
//    }
}
