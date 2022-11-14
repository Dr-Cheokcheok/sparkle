package com.spakle.spakleclone20221104.domain;

import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
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
    private List<ProductImgFile> productImgFiles;
}
