package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.Product;
import com.spakle.spakleclone20221104.domain.ProductImgFile;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ProductRepository {
    public int saveProduct(Product product) throws Exception;
    public int saveImgFiles(List<ProductImgFile> productImgFiles) throws Exception;
}
