package com.spakle.spakleclone20221104.dto;

import lombok.Data;

@Data
public class OrderReqDto {
    private int groupId;
    private String productName;
    private int productPrice;
    private String productSize;
    private String productColor;
    private String productImg;
}
