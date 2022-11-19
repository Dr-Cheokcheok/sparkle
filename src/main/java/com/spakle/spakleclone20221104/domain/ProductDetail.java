package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import com.spakle.spakleclone20221104.dto.product.ProductModificationRespDto;
import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail {
    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private String img;
    private int retailPrice;
    private List<ProductImgFile> productImgFiles;


    public ProductModificationRespDto modificationRespDto(){
        return ProductModificationRespDto.builder()
                .id(id)
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .rate(rate)
                .retailPrice(retailPrice)
                .img(img)
                .imgFiles(productImgFiles)
                .build();
    }



}
