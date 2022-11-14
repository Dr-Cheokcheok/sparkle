package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.ProductListRespDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class Product {
    private int id;
    private String category;
    private String group;
    private String name;
    private double price;
    private double retail_price;
    private String img; //이미지 경로 (temp_name)
    private List<ProductImgFile> files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public ProductListRespDto toRespDto(){
        return ProductListRespDto.builder()
                .id(id)
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .retailPrice(retail_price) //할인 안하는 상품이면 0이 들어옴
                .img(img)
                .build();
    }

}
