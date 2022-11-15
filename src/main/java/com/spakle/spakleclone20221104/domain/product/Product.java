package com.spakle.spakleclone20221104.domain.product;

import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Product {
    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
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
                .rate(rate) //할인 안하는 상품이면 0이 들어옴
                .img(img)
                .build();
    }

}
