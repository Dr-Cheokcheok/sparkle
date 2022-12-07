package com.spakle.spakleclone20221104.dto.order;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyInfoCountDto {

    private String username;
    private String orderId;
    private int userId;
    private String orderUserId;
    private int likesId;
    private int cartId;

    private int orderCount;
    private int cartCount;
    private int likesCount;

}
