package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyInfoCount {

    private String username;
    private String realName;
    private String orderId;
    private int userId;
    private String orderUserId;
    private int likesId;
    private int cartId;

    private int orderCount;
    private int cartCount;
    private int likesCount;

}
