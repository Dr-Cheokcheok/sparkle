package com.spakle.spakleclone20221104.dto.shop;

import com.spakle.spakleclone20221104.domain.BagVO;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BagDto {

    private int user_id;
    private int count;
    private int product_id;
    private int quantity;

    public BagVO toBagEntity(){
        return BagVO.builder()
                .user_id(user_id)
                .count(count)
                .product_id(product_id)
                .quantity(quantity)
                .build();
    }
}
