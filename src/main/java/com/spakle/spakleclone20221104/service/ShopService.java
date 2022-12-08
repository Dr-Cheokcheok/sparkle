package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;

import java.util.List;

public interface ShopService {

    public List<ShopListRespDto> getCollections(String category) throws Exception;
    public ProductDetailRespDto getProductDetails(int id) throws Exception;

    public List<ShopListRespDto> getIngiProduct()throws Exception;
}
