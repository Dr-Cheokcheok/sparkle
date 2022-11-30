package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.order.Order;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderReqDto {
    private int orderId;
    private String userId;
    private LocalDateTime orderDate;
    private String ordererName;
    private String recipientName;
    private String phone;
    private int postCode;
    private String address;
    private String detailAddress;
    private String shipMsg;
    private String entrance;
    private int pet;

    public Order toOrderEntity() {
        return Order.builder()
                .order_id(orderId)
                .user_id(userId)
                .order_date(orderDate)
                .orderer_name(ordererName)
                .phone(phone)
                .recipient_name(recipientName)
                .post_code(postCode)
                .address(address)
                .detail_address(detailAddress)
                .ship_msg(shipMsg)
                .entrance(entrance)
                .pet(pet)
                .build();
    }

}
