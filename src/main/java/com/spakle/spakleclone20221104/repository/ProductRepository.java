package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.ProductDetail;
import com.spakle.spakleclone20221104.domain.product.Product;
import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface ProductRepository {
    public int saveProduct(Product product) throws Exception;
    public int saveImgFiles(List<ProductImgFile> productImgFiles) throws Exception;

    public boolean updateProduct(int productId) throws Exception;
    public ProductDetail getProduct(int id) throws Exception;

    public List<Product> getProductInquiry(Map<String, Object> map) throws Exception;

}
