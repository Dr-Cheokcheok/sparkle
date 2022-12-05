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

//    @NotBlank
//    @Pattern(regexp = "^{6}$", message = "6자 이상 입력해 주세요.",
//            groups = ValidationGroups.PatternCheckGroup.class
//    )
    private int id;
    private String username;
//    @NotBlank
    private String password;
    private String role;
    private String name;
<<<<<<< HEAD
    private String phone;
=======
    private String  phone;
>>>>>>> 58a064315d7a8054503b4b128fb9043b054ff5a4
    private String post_code;
    private String address;
    private String detail_address;
    private int event_sosick;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public User toUserEntity() {
        return User.builder()
                // .username(id)
                .id(id)
                .username(username)
                .password(new BCryptPasswordEncoder().encode(password))
                .role("ROLE_USER")
                .name(name)
                .phone(phone)
                .post_code(post_code)
                .address(address)
                .detail_address(detail_address)
                .event_sosick(event_sosick)
                .build();
    }


}
