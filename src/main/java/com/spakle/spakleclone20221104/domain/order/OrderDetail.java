package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderDetail {
    private int order_id;
    private int product_id;
    private int quantity;
    private int total_price;
}
