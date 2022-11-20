package com.spakle.spakleclone20221104.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private String username;
    private String password;
    private Role role;
    private String name;
    private int phone;
    private int post_code;
    private String address;
    private String detail_address;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
    private String provider;

    private String email;
    private int role_id;


}
