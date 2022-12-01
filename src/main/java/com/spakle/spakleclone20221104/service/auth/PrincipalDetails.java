package com.spakle.spakleclone20221104.service.auth;

import com.spakle.spakleclone20221104.domain.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

@Getter
public class PrincipalDetails implements UserDetails {

    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        Arrays.asList(user.getRole().split(",")).forEach(role -> {
            authorities.add(() -> role);
        });

        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }  //계정의 만료 여부(계정의 사용기간 만료)

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }  //계정의 잠김 여부(관리자가 강제로 사용을 금함)

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }  // 비밀번호 만료 여부(비밀번호 5회이상 틀렸을 때)

    @Override
    public boolean isEnabled() {
        return true;
    }   // 계정의 활성화 여부(휴먼 계정, 이메일 또는 전화번호 인증 필요)
}
