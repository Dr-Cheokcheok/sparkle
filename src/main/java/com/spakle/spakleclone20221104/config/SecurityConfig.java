package com.spakle.spakleclone20221104.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests() //모든 요청시에 실행해라
                .antMatchers("/account/**","/users/**") //해당 요청 주소들은
                .authenticated() //인증이 필요하다
                .anyRequest() //antMatchers 외에 다른 모든 요청들은
                .permitAll() //모두 접근 권한을 허용해라.
                .and()
                .formLogin() //폼로그인 방식으로 인증을 해라
                .loginPage("/login") //우리가 만든 로그인 페이지를 사용해라
                .defaultSuccessUrl("/index");

    }
}
