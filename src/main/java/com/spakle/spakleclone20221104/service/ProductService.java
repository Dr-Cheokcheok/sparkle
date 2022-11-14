package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.ProductAdditionReqDto;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;
}
