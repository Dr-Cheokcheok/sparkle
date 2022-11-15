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
    public List<ShopListRespDto> getCollections(String category) throws Exception {
        List<ShopListRespDto> responses = new ArrayList<ShopListRespDto>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", category);

        return null;
    }

    @Override
    public ProductDetailRespDto getProductDetails(int id) throws Exception {
        List<ProductDetail> productDetails = shopRepository.getProduct(id);
        List<String> imgNames = new ArrayList<>();

        productDetails.get(0).getProductImgFiles().forEach(productFile -> {
            imgNames.add(productFile.getTemp_name());
        });

        ProductDetailRespDto productDetailRespDto = ProductDetailRespDto.builder()
                .id(productDetails.get(0).getId())
                .category(productDetails.get(0).getCategory())
                .group(productDetails.get(0).getGroup())
                .name(productDetails.get(0).getName())
                .price(productDetails.get(0).getPrice())
                .rate(productDetails.get(0).getPrice())
                .img(productDetails.get(0).getImg())
                .productImgFiles(imgNames)
                .build();



        return productDetailRespDto;
    }
}
