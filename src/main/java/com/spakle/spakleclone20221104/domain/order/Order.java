package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    private String order_id;
    private String user_id;
    private LocalDateTime order_date;
    private String orderer_name;
    private String recipient_name;
    private String phone;
    private String  post_code;
    private String address;
    private String detail_address;
    private String ship_msg;
    private String entrance;
    private int total_price;
    private int retail_price;
    private int pet;

    private int quantity;
    private int product_id;

    private String name;
    private String img;

}
