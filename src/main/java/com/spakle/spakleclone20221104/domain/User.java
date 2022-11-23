package com.spakle.spakleclone20221104.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor

public class User {
    private int id;
    private String username;
    private String password;
    private String role;
    private String name;
    private String phone;
    private String post_code;
    private String address;
    private String detail_address;
    private int event_sosick;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
