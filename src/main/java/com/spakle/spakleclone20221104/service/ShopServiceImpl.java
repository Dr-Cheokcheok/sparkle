package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.ProductDetail;
import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
import com.spakle.spakleclone20221104.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {

    private final ShopRepository shopRepository;
    @Override
    public List<ShopListRespDto> getCollections(String category, String group) throws Exception {
        List<ShopListRespDto> responses = new ArrayList<ShopListRespDto>();

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
