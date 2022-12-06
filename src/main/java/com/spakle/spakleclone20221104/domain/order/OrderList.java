package com.spakle.spakleclone20221104.domain.order;

import com.spakle.spakleclone20221104.dto.order.OrderListRepDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public OrderListRepDto toOrderListResp() {
        return OrderListRepDto.builder()
                .userId(user_id)
                .orderDate(order_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .orderId(order_id)
                .totalPrice(total_price)
                .orderDetailList(orderDetailList)
                .build();

    }
}
