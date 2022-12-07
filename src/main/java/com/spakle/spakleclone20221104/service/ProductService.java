package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.dto.product.ProductDtlRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductModificationReqDto;

import java.util.List;

public interface ProductService {
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception;

    public boolean updateProduct(ProductModificationReqDto productModificationReqDto) throws Exception;

    public ProductDtlRespDto getProductDtl (int productId)throws Exception;

    public List<ProductListRespDto> getProducts(String category) throws Exception;

    public boolean deleteProduct(int productId) throws Exception;

}
