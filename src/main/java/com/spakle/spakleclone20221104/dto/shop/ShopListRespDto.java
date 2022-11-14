package com.spakle.spakleclone20221104.dto.shop;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
public class ShopListRespDto {
    private String category;
    private String group;
    private String name;

    private int price;
    private int rate;
    private String img;
}
