package com.spakle.spakleclone20221104.dto.order;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderListRepDto {

    private String userId;
    private String orderId;
    private LocalDateTime orderDate;
    private int totalPrice;
    private String img;
    private int productId;
    private int quantity;
    private String name;
}
