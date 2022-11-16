package com.spakle.spakleclone20221104.service;


import com.spakle.spakleclone20221104.dto.ProductListRespDto;

import java.util.List;

public interface ShopService {

    public List<ProductListRespDto> getCollections(String category, String group)throws Exception;
}
