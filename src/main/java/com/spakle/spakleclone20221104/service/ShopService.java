package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;

import java.util.List;

public interface ShopService {

    public List<ShopListRespDto> getCollections(String category, String group) throws Exception;
    public ProductDetailRespDto getProductDetails(int id) throws Exception;
}
