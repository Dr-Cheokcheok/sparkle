package com.spakle.spakleclone20221104.dto.order;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderRespDto {
    private String orderId;
    private String userId;
    private LocalDateTime orderDate;
    private String ordererName;
    private String recipientName;
    private String phone;
    private String postCode;
    private String address;
    private String detailAddress;
    private String shipMsg;
    private String entrance;
    private int pet;
    private int retailPrice;
    private int totalPrice;

    private int quantity;
    private int productId;

    private String name;
    private String img;

}
