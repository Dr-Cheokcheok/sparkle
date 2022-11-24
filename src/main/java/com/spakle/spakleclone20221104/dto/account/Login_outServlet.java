package com.spakle.spakleclone20221104.dto.account;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet
public class Login_outServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse rsep) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if (username.isEmpty() || password.isEmpty()){

        }

        HttpSession session = req.getSession();

        if (session.isNew() || session.getAttribute("username") == null) {
            session.setAttribute("username", username);
            if (session.isNew()){
                System.out.println("세션 생성후 로그인 완료");
            }else System.out.println("로그인 완료");
        }else {
            System.out.println("현재 로그인 상태");
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse rsep) throws ServletException, IOException {
        HttpSession session = req.getSession();
        if(session != null && session.getAttribute("username") != null){
            session.invalidate();
        }else {
            System.out.println("현재 로그인 상태가 아닙니다.");
        }
    }
}
