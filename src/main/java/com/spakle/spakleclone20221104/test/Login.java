//package com.spakle.spakleclone20221104.test;
//
//import com.spakle.spakleclone20221104.domain.User;
//
//import javax.servlet.RequestDispatcher;
//import javax.servlet.ServletContext;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//
//@WebServlet("/auth/login")
//public class Login extends HttpServlet {
//
//    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//
//        RequestDispatcher rd = req.getRequestDispatcher("/login.html");
//        rd.forward(req, resp);
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        Connection conn = null;
//        PreparedStatement pstmt = null;
//        ResultSet rs = null;
//
//        ServletContext sc = req.getServletContext();
//
//        try {
//            conn = (Connection) sc.getAttribute("conn");
//
//            // DB에서 정보 조회
//            pstmt = conn.prepareStatement(
//                    "SELECT USERNAEM, NAME FROM USER" +
//                            " WHERE USERNAEM = ? AND PASSWORD = ?"
//            );
//            pstmt.setString(1, req.getParameter("username"));
//            pstmt.setString(2, req.getParameter("password"));
//            rs = pstmt.executeQuery();
//
//            // 일치하는 계정이 있으면 User에 계정 정보 담음
//            if(rs.next()) {
//                User user = new User()
//                        .setUserName(rs.getString("USERNAME"))
//                        .setName(rs.getString("NAME"));
//                // HttpSession에 저장
//                HttpSession session = req.getSession();
//                session.setAttribute("user", user);
//
//                // /user/list로 리다이렉트
//                resp.sendRedirect("../user/list");
//            } else {
//                // 로그인 실패 시 /login.html로 포워딩
//                RequestDispatcher rd = req.getRequestDispatcher("/login.html");
//                rd.forward(req, resp);
//            }
//        } catch (SQLException e) {
//            req.setAttribute("error", e);
//            RequestDispatcher rd = req.getRequestDispatcher("/login.html");
//            rd.forward(req, resp);
//        } finally {
//            try {
//                if(rs != null) rs.close();
//                if(pstmt != null) pstmt.close();
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//    }
//}
