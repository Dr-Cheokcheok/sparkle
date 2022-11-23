package com.spakle.spakleclone20221104.dto.product;

import com.spakle.spakleclone20221104.domain.product.Product;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
public class ProductModificationReqDto {

    private int id;
    private String category;
    private String group;
    private String name;
    private int price;
    private int rate;
    private int retailPrice;
    private MultipartFile img; //추가한 메인이미지

    private String mainPath; //메인이미지 temp_name으로 만들어서 set

    private String deleteMainImg;           //지운 메인이미지
    private List<String> deleteImgFiles; //지운 파일<이름>
    private List<MultipartFile> files;  //추가한 파일리스트<파일>





    public Product toProductEntity(){
        return Product.builder()
                .id(id)
                .category(category)
                .group(group)
                .name(name)
                .price(price)
                .rate(rate)
                .retail_price(retailPrice)
                .img(mainPath)
                .build();
    }

}
