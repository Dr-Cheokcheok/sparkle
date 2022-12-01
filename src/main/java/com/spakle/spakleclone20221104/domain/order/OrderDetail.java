package com.spakle.spakleclone20221104.domain.order;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class OrderDetail {
    private String order_id;
    private int product_id;
    private int quantity;
}
