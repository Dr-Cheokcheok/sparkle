package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;

import java.util.List;

public interface AdminService {

    public List<ProductListRespDto> getProductInquiry(String category) throws Exception;
}
