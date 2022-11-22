package com.spakle.spakleclone20221104.dto.shop;

import com.spakle.spakleclone20221104.domain.product.Product;
import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class ProductDetailRespDto {
    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private int retailPrice;
    private String img;

    private List<String> productImgFiles;

    private LocalDateTime updateDate;

}
