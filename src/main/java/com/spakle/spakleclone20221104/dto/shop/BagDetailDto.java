package com.spakle.spakleclone20221104.dto.shop;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BagDetailDto {

    public int user_id; //유저id
    public int product_id;  //제품id
    public int quantity;    //수량

    public String product_name; //제품이름
    public int price;   //가격
    public int rate;    //할인율
    public int retail_price;    //할인된 가격

}
