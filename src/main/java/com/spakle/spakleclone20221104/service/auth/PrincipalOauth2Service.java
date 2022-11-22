package com.spakle.spakleclone20221104.service.auth;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.repository.AccountRepository;
import com.spakle.spakleclone20221104.security.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2Service extends DefaultOAuth2UserService {
    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getClientName();
        OAuth2User oAuth2User = super.loadUser(userRequest);

        log.info("userRequest >>>> {}", userRequest);
        log.info("getClientRegistration >>>> {}", userRequest.getClientRegistration());
        log.info("getAttributes >>>> {}", oAuth2User.getAttributes());

        User user = getOauth2User(provider, oAuth2User.getAttributes());

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
    private User getOauth2User(String provider, Map<String, Object> attributes) {
        String oauth2_id = null;
        String id = null;
        String username = null;

        User user = null;

        Map<String, Object> response = null;

        PrincipalDetails principalDetails = null;

        if (provider.equalsIgnoreCase("google")) {
            response = attributes;
            id = (String) response.get("sub");
        }else if (provider.equalsIgnoreCase("naver")){
            response = (Map<String, Object>) attributes.get("response");
            id = (String) response.get("id");
        }

        oauth2_id = provider + "_" + id;
        username = (String) response.get("username");

        user = accountRepository.findUserByUsername(id);
        if (user == null) {
            user = User.builder()
                    .username(id)
                    .oauth_username(oauth2_id)
                    .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().replaceAll("-", "")))
                    .name((String) response.get("name"))
                    .id(id)
                    .role_id(1)
                    .provider(provider)
                    .build();

            accountRepository.save(user);

        } else if (user.getOauth_username() == null) {
            user.setOauth_username(oauth2_id);
            user.setProvider(provider);
            accountRepository.updateUserOauth2(user);
        }
        return user;
    }
}
