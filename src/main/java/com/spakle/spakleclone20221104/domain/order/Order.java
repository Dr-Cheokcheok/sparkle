package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    private int order_id;
    private String user_id;
    private LocalDateTime order_date;
    private String orderer_name;
    private String recipient_name;
    private String phone;
    private int post_code;
    private String address;
    private String detail_address;
    private String ship_msg;
    private String entrance;
    private int pet;
    private int total_price;

    private List<OrderDetail> orderDetails;
}
