package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.CollectionProduct;
import com.spakle.spakleclone20221104.domain.ProductDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ShopRepository {

    public List<CollectionProduct> getCollectionList(Map<String, Object> map) throws Exception;
    public List<ProductDetail> getProduct(int id) throws Exception;
}
