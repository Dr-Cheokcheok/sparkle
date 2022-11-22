package com.spakle.spakleclone20221104.domain.product;

import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    private LocalDateTime updateDate;
    private List<ProductImgFile> productImgFiles;





}
