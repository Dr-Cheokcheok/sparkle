package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Bag {
    public int id;  //제품id
    public String name; //제품이름
    public int quantity;    //수량
    public int price;   //가격
    public int rate;    //할인율
    public int retail_price;    //할인된 가격
    private String img; //제품이미지

    public BagDetailDto toRespDto(){
        return BagDetailDto.builder()
                .id(id)
                .name(name)
                .quantity(quantity)
                .price(price)
                .rate(rate) //할인 안하는 상품이면 0이 들어옴
                .retailprice(retail_price)
                .img(img)
                .build();
    }
}
