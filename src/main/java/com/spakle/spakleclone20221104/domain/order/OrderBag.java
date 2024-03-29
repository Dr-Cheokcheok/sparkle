package com.spakle.spakleclone20221104.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderBag {
    private String user_id;
    private int product_id;
    private int quantity;
}
