package com.spakle.spakleclone20221104.dto.account;

import com.spakle.spakleclone20221104.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserMod {
    private int id;
    private String name;
    private String password;
    private String phone;
    private int event_sosick;
    private String post_code;
    private String address;
    private String detail_address;


    //이게 맞을까?????????????????
    public User setUserEntity(User user){
        return User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(password)
                .name(name)
                .role(user.getRole())
                .provider(user.getProvider())
                .phone(phone)
                .post_code(post_code)
                .address(address)
                .detail_address(detail_address)
                .event_sosick(event_sosick)
                .create_date(user.getCreate_date())
                .update_date(LocalDateTime.now())
                .build();
    }

}
