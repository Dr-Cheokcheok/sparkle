package com.spakle.spakleclone20221104.service;

<<<<<<< HEAD
import com.spakle.spakleclone20221104.dto.ProductListRespDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
=======
import com.spakle.spakleclone20221104.domain.ProductDetail;
import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
import com.spakle.spakleclone20221104.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
>>>>>>> min
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService{

    @Override   //반환은 카테고리-그룹 별로 묶인                                    //생수-2L/생수-500ml/
    public List<ProductListRespDto> getCollections(String category, String group) throws Exception {
        List<ProductListRespDto> response = new ArrayList<ProductListRespDto>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", category);
        map.put("group", group);

        shopRepository.getCollectionList(map).forEach(collection -> {
            responses.add(collection.toListRespDto());
        });

        return responses;
    }

    @Override
    public ProductDetailRespDto getProductDetails(int id) throws Exception {
        ProductDetail productDetails = shopRepository.getProduct(id);
        List<String> imgNames = new ArrayList<>();

        productDetails.getProductImgFiles().forEach(productFile -> {
            imgNames.add(productFile.getTemp_name());
        });

        ProductDetailRespDto productDetailRespDto = ProductDetailRespDto.builder()
                .id(productDetails.getId())
                .category(productDetails.getCategory())
                .group(productDetails.getGroup())
                .name(productDetails.getName())
                .price(productDetails.getPrice())
                .rate(productDetails.getRate())
                .img(productDetails.getImg())
                .productImgFiles(imgNames)
                .build();

        return productDetailRespDto;
    }
}
