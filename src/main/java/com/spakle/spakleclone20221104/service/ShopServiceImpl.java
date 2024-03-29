package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.product.ProductDetail;
import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
import com.spakle.spakleclone20221104.repository.ShopRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopServiceImpl implements ShopService{

    private final ShopRepository shopRepository;

    @Override   //반환은 카테고리-그룹 별로 묶인                                    //생수-2L/생수-500ml/
    public List<ShopListRespDto> getCollections(String category) throws Exception {
        List<ShopListRespDto> response = new ArrayList<ShopListRespDto>();

        //map으로 안해도되지 않나 -> 안해도됨

        shopRepository.getCollectionList(category).forEach(collection -> {
            response.add(collection.toListRespDto());
        });

        return response;
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
                .retailPrice(productDetails.getRetailPrice())
                .img(productDetails.getImg())
                .productImgFiles(imgNames)
                .build();

        return productDetailRespDto;
    }

    @Override
    public List<ShopListRespDto> getIngiProduct() throws Exception {
        List<ShopListRespDto> ingiProducts = new ArrayList<>();
        shopRepository.getIngiProduct().forEach(collectionProduct -> {
            ingiProducts.add(collectionProduct.toListRespDto());

        });

        return ingiProducts;
    }
}
