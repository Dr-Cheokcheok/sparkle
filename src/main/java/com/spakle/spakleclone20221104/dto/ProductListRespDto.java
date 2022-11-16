package com.spakle.spakleclone20221104.dto;

import com.spakle.spakleclone20221104.domain.ProductImgFile;
import lombok.Builder;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.List;

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

    private String img;

    private LocalDateTime updateDate;

}
