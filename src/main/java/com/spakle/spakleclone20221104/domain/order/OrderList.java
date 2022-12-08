package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderList {

    private String user_id;
    private String order_id;
    private LocalDateTime order_date;
    private int total_price;

    private List<OrderDetail> orderDetailList;

}
