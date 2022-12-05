package com.spakle.spakleclone20221104.domain.order;

import com.spakle.spakleclone20221104.dto.order.OrderItemDto;
import com.spakle.spakleclone20221104.dto.order.OrderReqDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class OrderItem {


    /* 상품 번호 */
    private int id;

    private String name;

    private int price;

    /* 상품 할인 율 - 표시용 */
    private double rate;

    /* 상품 한개 가격 (할인가)  */
    private int retail_price;

    private String img;


    public OrderItemDto toItemDto(){
        return OrderItemDto.builder()
                .productId(id)
                .name(name)
                .originPrice(price)
                .rate(rate)
                .retailPrice(retail_price)
                .img(img)
                .build();
    }

//    public OrderReqDto toItemDto(){
//        return OrderReqDto.builder()
//                .productId(id)
//                .name(name)
//                .originPrice(price)
//                .rate(rate)
//                .retailPrice(retail_price)
//                .img(img)
//                .build();
//    }
}
