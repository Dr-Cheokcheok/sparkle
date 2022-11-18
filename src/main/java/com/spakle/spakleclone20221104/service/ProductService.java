package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;

import java.util.List;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;

    public List<ProductListRespDto> getProducts(String category) throws Exception;
}
