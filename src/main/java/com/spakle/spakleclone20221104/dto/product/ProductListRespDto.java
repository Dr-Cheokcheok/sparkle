package com.spakle.spakleclone20221104.dto.product;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/* product 여기저기 뿌려줄때 */
@Builder
@Data
public class ProductListRespDto {

    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private int retailPrice;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    private String img;

}
