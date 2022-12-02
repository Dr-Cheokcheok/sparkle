package com.spakle.spakleclone20221104.dto.account;

import lombok.Builder;
import lombok.Data;

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

}
