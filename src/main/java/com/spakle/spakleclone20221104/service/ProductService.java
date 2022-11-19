package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;

    public boolean updateProduct(int ProductId)throws Exception;
}
