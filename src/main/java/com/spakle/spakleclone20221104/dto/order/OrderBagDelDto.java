package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.order.OrderBag;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderBagDelDto {
    private String userId;
    private int productId;
    private int quantity;

    public OrderBag toBagDelEntity() {
        return OrderBag.builder()
            .user_id(userId)
            .product_id(productId)
            .quantity(quantity)
            .build();
    }
}
