package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.dto.order.OrderReqDto;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class BagList {
    private int productId;
    private String name;
    private int originPrice;
    private int retailPrice;
    private int rate;
    private int quantity;
    private String img;
    public int getDiscountAmount() {
        return (originPrice - retailPrice) * quantity;
    }
    public int getTotalPrice(){
        return originPrice * quantity;
    }

    public OrderReqDto toItemsDto(){
        return OrderReqDto.builder()
                .productId(productId)
                .name(name)
                .originPrice(originPrice)
                .retailPrice(retailPrice)
                .rate(rate) //할인 안하는 상품이면 0이 들어옴
                .quantity(quantity)
                .img(img)

                .build();
    }
}
