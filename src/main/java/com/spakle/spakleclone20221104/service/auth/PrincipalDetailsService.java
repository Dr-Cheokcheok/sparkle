package com.spakle.spakleclone20221104.service.auth;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;

        try {
            user = accountRepository.findUserByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomInternalServerErrorException("회원 정보 조회 오류");
        }
        if (user == null) {
            throw new UsernameNotFoundException("잘못된 사용자 정보");
        }
        return new PrincipalDetails(user);
    }
}