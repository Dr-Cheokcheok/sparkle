package com.spakle.spakleclone20221104.dto.shop;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BagDetailDto {

    public int id;  //제품id
    public String name; //제품이름
    public int quantity;    //수량
    public int price;   //가격
    public int rate;    //할인율
    public int retailprice;    //할인된 가격
    private String img; //제품이미지
}
