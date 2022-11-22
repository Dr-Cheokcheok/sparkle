package com.spakle.spakleclone20221104.service;


import com.spakle.spakleclone20221104.domain.product.Product;
import com.spakle.spakleclone20221104.domain.product.ProductDetail;
import com.spakle.spakleclone20221104.domain.product.ProductImgFile;
import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.dto.product.ProductDtlRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductListRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductModificationReqDto;
import com.spakle.spakleclone20221104.dto.shop.ProductDetailRespDto;
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
import java.util.*;

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
        MultipartFile mainImg = productAdditionReqDto.getMainFile(); //->경로를 product에 넣어줘야
        List<MultipartFile> files = productAdditionReqDto.getFiles(); //dto의 files를 가져옴


        //경로 있으려면 temp_name생성, origin_name 필요한가?
        List<ProductImgFile> productImgFiles = null;
        Product product = productAdditionReqDto.toProductEntity();


        //if 없앨ㄸ까?
        if (!mainImg.isEmpty() && files != null) {

            product.setImg(getMainImgPath(mainImg));

            resultCount1 = productRepository.saveProduct(product);
            int productId = product.getId();
            productImgFiles = getProductImgFiles(files, productId); //producctImgFile 리스트로 반환
            resultCount2 = productRepository.saveImgFiles(productImgFiles); //저장한 이미지리스트를 db 등록
        } else {
            log.info("mainImg : " + mainImg);
            log.info("files : " + files);
        }
        //product에도 저장되고, product_img에도 저장되어야 상품등록 성공!
        if (resultCount1 == 0 || resultCount2 == 0) {
            throw new CustomInternalServerErrorException("상품 등록 실패");
        }
        return true;
    }

    private String getMainImgPath(MultipartFile mainImg)throws Exception{
        String originName = mainImg.getOriginalFilename();
        String extension = originName.substring(originName.lastIndexOf("."));
        String tempName = "main_" + UUID.randomUUID() + extension;

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

        return tempName;
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


    @Override
    public List<ProductListRespDto> getProducts(String category) throws Exception {
        log.info("{}", category);

        List<ProductListRespDto> productList = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        map.put("category", category);

        productRepository.getProductInquiry(map).forEach(product -> {
            productList.add(product.toRespDto());
        });

        return productList;

    }

    @Override
    public boolean updateProduct(ProductModificationReqDto productModificationReqDto) throws Exception {
        boolean status = false;
        //dto to Entity 해서 Product 객체 update 쿼리로

        //db업데이트하기 전에 modificationdto에 mainPath 넣어주기
        MultipartFile mainFile= productModificationReqDto.getImg();
        productModificationReqDto.setMainPath(getMainImgPath(mainFile));
        int result = productRepository.setProduct(productModificationReqDto.toProductEntity());


        //업데이트 건수가 0이 아니면
        if(result != 0){
            status = true;
            boolean insertStatus = true;
            boolean deleteStatus = true;
            //만약 업데이트한 파일이 있으면?
            if(productModificationReqDto.getFiles() != null){
                //dto의 files와 product_id 가져와
                insertStatus = insertProductImg(productModificationReqDto.getFiles(), productModificationReqDto.getId());
                //db에 insert 잘 됐으면 true
            }
            if(productModificationReqDto.getDeleteImgFiles() != null){
                //dto의 deleteFiles와 product_id 가져와
                deleteStatus = deleteProductImg(productModificationReqDto.getDeleteImgFiles(), productModificationReqDto.getId());
            }
            status = status && insertStatus && deleteStatus;

            if(status == false){
                log.info("insert status: " + insertStatus);
                log.info("delete status: " + deleteStatus);

                throw new CustomInternalServerErrorException("상품 수정 오류");
            }
        }
        return status;
    }

    @Override
    public ProductDtlRespDto getProductDtl(int productId)throws Exception {
        ProductDetail product = productRepository.getProductDtl(productId);

        return ProductDtlRespDto.builder()
                .id(product.getId())
                .category(product.getCategory())
                .group(product.getGroup())
                .name(product.getName())
                .price(product.getPrice())
                .rate(product.getRate())
                .retailPrice(product.getRetailPrice())
                .img(product.getImg())
                .productImgFiles(product.getProductImgFiles())
                .updateDate(product.getUpdateDate())
                .build();
    }



    private boolean insertProductImg(List<MultipartFile> files, int productId) throws Exception {
        boolean status = false;

        List<ProductImgFile> productImgFiles = getProductImgFiles(files,productId);


        return productRepository.saveImgFiles(productImgFiles) > 0; //insert된 개수가 0 보다 크면 true
    }

    private boolean deleteProductImg(List<String> deleteImgFiles, int productId) throws Exception{
        boolean status = false;

        Map<String , Object> map = new HashMap<>();
        map.put("productId", productId);
        map.put("deleteImgFiles", deleteImgFiles);

        int result = productRepository.deleteImgFiles(map);

        //delete 건수가 0이 아니면!
        if(result != 0){
            //파일 delete도 반복 돌아야한다
            deleteImgFiles.forEach(temp_name ->{
                // path -> 파일객체 하나하나의 이름까지 가져와서 그 경로에서 지워야 하기 때문에 forEach
                Path uploadPath = Paths.get(filePath + "/product/" + temp_name);

                File file = new File(uploadPath.toUri());
                if(!file.exists()){
                    file.mkdirs();
                    if(!file.delete()){
                        throw new RuntimeException();
                    }
                    //람다라서 이렇게 접근 불가하대
                    //deleteSuccess++;
                }else{
                    if(!file.delete()){
                        throw new RuntimeException();
                    }
                }
            });
            status = true;
        }
        return status;
    }
}

