package com.spakle.spakleclone20221104.dto;

import com.spakle.spakleclone20221104.domain.Product;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ProductAdditionReqDto {

    private String category;
    private String group;
    private String name;

    private int price;
    @Nullable
    private int rate;
    private int retailPrice;

    //mainImg랑 infoImg
    private MultipartFile mainFile;
    private String imgPath;


    private List<MultipartFile> files;


    public Product toProductEntity(){
        return Product.builder()
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .rate(rate)
                .retail_price(retailPrice)
                .img(imgPath)
                .build();
    }
}
