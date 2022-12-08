package com.spakle.spakleclone20221104.config;

import com.spakle.spakleclone20221104.security.AuthFailureHandler;
import com.spakle.spakleclone20221104.security.AuthSuccessHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .antMatchers("/account/**", "/order/**", "/bag/**")//해당 주소 요청은
                .access("hasRole('USER') or hasRole('ADMIN') or hasRole('MANAGER')")//USER나 ADMIN이나 MANAGER면 다 들어올수 있다.
                .antMatchers("/", "/index", "/shop/**", "/product/**")//해당 주소 요청은
                .permitAll()//모두 접근 가능 (even 회원 아니여도)
                .antMatchers("/account/login", "/account/register")
                .permitAll()

                /*<<<<<<<<<<<<<<<<<<<Resource>>>>>>>>>>>>>>>>>>>>>>*/
                .antMatchers("/static/**", "/image/**")// 제발 / 잘 붙여
                .permitAll()        //static 이랑 image 으로 들어오면 전부 승인해라

                /*<<<<<<<<<<<<<<<<<<<API>>>>>>>>>>>>>>>>>>>>>>*/
                .antMatchers("/api/account/register","/api/collections/**", "/api/auth/**")
                .permitAll()

                .anyRequest()       //antMatchers 외에 다른 모든 요청들은
                .permitAll()        //수업때만 permitAll한다. 귀찮으니까
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/index", false)
                .successHandler(new AuthSuccessHandler())
                .permitAll()
                .failureHandler(new AuthFailureHandler())
                .and()
                .logout() // 로그아웃 설정
                .permitAll()
                .logoutSuccessUrl("/login") // 로그아웃 성공시 돌아갈 url
                .invalidateHttpSession(true) ; // 저장된 세션 삭제



    }
}