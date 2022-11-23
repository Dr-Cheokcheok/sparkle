package com.spakle.spakleclone20221104.dto.shop;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ShopListRespDto {
    private int productId;
    private String category;
    private String group;
    private String name;

    private int price;
    private int rate;
    private int retailPrice;

    private String img;
    private int totalCount;

}
