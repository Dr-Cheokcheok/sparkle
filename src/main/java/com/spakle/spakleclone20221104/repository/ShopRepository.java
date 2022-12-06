package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.CollectionProduct;
import com.spakle.spakleclone20221104.domain.product.ProductDetail;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopRepository {

    public List<CollectionProduct> getCollectionList(String category) throws Exception;
    public ProductDetail getProduct(int id) throws Exception;

    public List<CollectionProduct> getIngiProduct()throws Exception;
}
