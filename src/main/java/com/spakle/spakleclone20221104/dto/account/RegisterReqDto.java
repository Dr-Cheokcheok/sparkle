package com.spakle.spakleclone20221104.dto.account;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.validation.ValidationGroups;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
public class RegisterReqDto {

    @NotBlank
    @Pattern(regexp = "^{6}$", message = "6자 이상 입력해 주세요.",
            groups = ValidationGroups.PatternCheckGroup.class
    )
    private String id;

    @NotBlank
    private String password;
    private String role;
    private String name;
    private int phone;
    private String post_code;
    private String address;
    private String detail_address;
    private int event_sosick;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public User toUserEntity() {
        return User.builder()
                .username(id)
                .password(new BCryptPasswordEncoder().encode(password))
                .role_id(1)
                .name(name)
                .phone(phone)
                .post_code(post_code)
                .address(address)
                .detail_address(detail_address)
                .event_sosick(event_sosick)
                .build();
    }


}
