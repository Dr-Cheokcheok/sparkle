package com.spakle.spakleclone20221104.service;


import com.spakle.spakleclone20221104.domain.Product;
import com.spakle.spakleclone20221104.domain.ProductImgFile;
import com.spakle.spakleclone20221104.dto.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService{
    @Value("${file.path}")
    private String filePath;
    private final ProductRepository productRepository;

    @Override
    public boolean addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception {
        int resultCount1 = 0;
        int resultCount2 = 0;
        MultipartFile mainImg = productAdditionReqDto.getImgFile(); //->경로를 dto에 넣어줘야
        List<MultipartFile> files = productAdditionReqDto.getFiles();


            //경로 있으려면 temp_name생성, origin_name 필요한가?
        List<ProductImgFile> productImgFiles = null;
        Product product = productAdditionReqDto.toProductEntity();
        resultCount1 = productRepository.saveProduct(product);


        //if 없앨ㄸ까?
        if(!mainImg.isEmpty() && files != null){
            int productId = product.getId();
            String originName = mainImg.getOriginalFilename();
            String extension = originName.substring(originName.lastIndexOf("."));
            String tempName = "main_" + UUID.randomUUID().toString() + extension;

            //저장 경로 설정  : product/main-djkfhladfld.jpg => 경로만 dto에 set 해주기
            Path imgPath = Paths.get(filePath + "/product/" + tempName);

            File f = new File(filePath + "/product");
            if(!f.exists()){
                f.mkdirs();
            }
            try {
                Files.write(imgPath, mainImg.getBytes());

            }catch (IOException e){
                throw new RuntimeException(e);
            }
            //imgPath 넣어줌
            productAdditionReqDto.setImgPath(imgPath.toString());

            productImgFiles = getProductImgFiles(files, productId);
            resultCount1 = productRepository.saveProduct(productAdditionReqDto.toProductEntity());
            resultCount2 = productRepository.saveImgFiles(productImgFiles);
        }

        if(resultCount1 == 0 || resultCount2 == 0){
            throw new CustomInternalServerErrorException("상품 등록 실패");
        }
        return true;
    }


    private List<ProductImgFile> getProductImgFiles(List<MultipartFile> files, int productId) throws Exception{
        List<ProductImgFile> productImgFiles = new ArrayList<ProductImgFile>();

        files.forEach(file -> {
            String originName = file.getOriginalFilename();
            String extension = originName.substring(originName.lastIndexOf("."));
            String tempName = UUID.randomUUID().toString() + extension;

            Path uploadPath = Paths.get(filePath + "/product/" + tempName);

            File f = new File(filePath + "/product");

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            //ProductImgFile builder 로 생성
            ProductImgFile productImgFile = ProductImgFile.builder()
                    .product_id(productId)
                    .origin_name(originName)
                    .temp_name(tempName)
                    .build();
            productImgFiles.add(productImgFile);
        });
        return productImgFiles;
    }


}
