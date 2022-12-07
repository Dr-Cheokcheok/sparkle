package com.spakle.spakleclone20221104.domain.order;

import com.spakle.spakleclone20221104.domain.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderDetail {
    private String order_id;
    private int product_id;
    private int quantity;

    private Product product;
}
