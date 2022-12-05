package com.spakle.spakleclone20221104.domain.order;

import com.spakle.spakleclone20221104.dto.order.OrderListRepDto;
import com.spakle.spakleclone20221104.dto.order.OrderRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderList {

    private String user_id;
    private String order_id;
    private LocalDateTime order_date;
    private int total_price;
    private String img;
    private int product_id;
    private String name;
    private int quantity;

    public OrderListRepDto toOrderListResp() {
        return OrderListRepDto.builder()
                .userId(user_id)
                .orderDate(order_date)
                .orderId(order_id)
                .totalPrice(total_price)
                .img(img)
                .quantity(quantity)
                .productId(product_id)
                .name(name)
                .build();

    }
}
