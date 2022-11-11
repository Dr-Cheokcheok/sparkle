package com.spakle.spakleclone20221104.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class ProductListRespDto {
    private int id;
    private String category;
    private String group;
    private String name;
    private double price;
    private double retailPrice;
    private String img;

}
