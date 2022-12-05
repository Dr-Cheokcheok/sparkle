package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.BagList;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
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
