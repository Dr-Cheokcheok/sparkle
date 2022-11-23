package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;

public class CollectionProduct {

    private int id; //스파클 product_id
    private String category;
    private String group;
    private String name;

    private int price;
    private int rate;
    private int retail_price;

    private String img; // 스파클 img
    private int total_count;

    public ShopListRespDto toListRespDto() {
        return ShopListRespDto.builder()
                .productId(id)
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .retailPrice(retail_price)
                .rate(rate)
                .img(img)
                .totalCount(total_count)
                .build();
    }
}
