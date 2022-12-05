package com.spakle.spakleclone20221104.dto.order;

import lombok.Data;

@Data


public class OrderReqDto {
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

}
