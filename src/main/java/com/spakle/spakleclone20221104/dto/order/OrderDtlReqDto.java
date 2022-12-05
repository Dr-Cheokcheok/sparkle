package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderDtlReqDto {
    private String orderId;
    private int productId;
    private int quantity;


    public OrderDetail toOrderDtlEntity() {
        return OrderDetail.builder()
                .order_id(orderId)
                .product_id(productId)
                .quantity(quantity)
                .build();
    }
}
