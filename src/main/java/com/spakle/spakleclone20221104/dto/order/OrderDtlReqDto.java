package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDtlReqDto {
    private int orderId;
    private int productId;
    private int quantity;
    private int totalPrice;

    public OrderDetail toOrderDtlEntity() {
        return OrderDetail.builder()
                .order_id(orderId)
                .product_id(productId)
                .quantity(quantity)
                .build();
    }
}
