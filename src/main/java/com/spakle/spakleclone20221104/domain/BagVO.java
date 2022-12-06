package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.shop.BagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor

public class BagVO {
    private int user_id;
    private int count;
    private int product_id;
    private int quantity;
}
