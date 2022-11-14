package com.spakle.spakleclone20221104.dto.shop;

import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import lombok.Builder;
import lombok.Data;

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
    private String img;

    private List<ProductImgFile> productImgFiles;
}
