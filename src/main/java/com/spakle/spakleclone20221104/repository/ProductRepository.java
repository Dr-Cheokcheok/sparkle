package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.order.OrderItem;
import com.spakle.spakleclone20221104.domain.product.Product;
import com.spakle.spakleclone20221104.domain.product.ProductDetail;
import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import com.spakle.spakleclone20221104.dto.order.OrderItemDto;
import groovyjarjarantlr4.v4.codegen.model.ExceptionClause;
import jdk.jshell.spi.ExecutionControlProvider;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface ProductRepository {
    public int saveProduct(Product product) throws Exception;
    public int saveImgFiles(List<ProductImgFile> productImgFiles) throws Exception;

    public ProductDetail getProductDtl(int productId) throws Exception;
    public int setProduct(Product product) throws Exception;
    public int deleteImgFiles(Map<String, Object> map) throws Exception;

    public List<ProductImgFile> getProductImgList(int productId) throws Exception;
    public List<Product> getProductInquiry(String category) throws Exception;

    public int deleteProduct(int productId) throws Exception;

    public List<Product> getIngiProduct()throws Exception;

}
