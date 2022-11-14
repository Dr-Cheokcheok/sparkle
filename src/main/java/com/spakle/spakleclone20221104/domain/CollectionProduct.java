package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;

import java.util.List;

public class CollectionProduct {

    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private String img;

    public ShopListRespDto toListRespDto() {
        return ShopListRespDto.builder()
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .rate(rate)
                .img(img)
                .build();
    }
}
