<%@ page language="java" contentType="text/html;
    charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/hrml4.loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>로그인</title>
</head>
<body>
   <form method="post" action="/login">
     <input class="id" type="username" name="username"><p>
     <input class="pass" type="password" name="password"><p>
     <input type="submit" class="confirm-btn" value="로그인">



       <%int midx = 0;

        if (session.getAttribute("midx") != null) {
          midx = (int)session.getAttribute("midx");
        }
        %>
        String name = (String)session.getAttribute("name");
     <!--로그인 전 화면  -->
     <%if (midx == 0) {%>
       <ul>
         <li><a href="#">로그인</a></li>
         <li><a href="#">회원가입</a></li>
         <li><a href="#">고객센터</a></li>
       </ul>

     <!--로그인 후 화면  -->
     <%} else if (midx > 0) {%>
       <ul>
         <li><a href="#">로그아웃</a></li>
         <li><a href="#">고객센터</a></li>
       </ul>
     <%};%>
   </form>
</body>
</html>