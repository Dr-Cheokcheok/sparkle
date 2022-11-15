package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//rest랑 그냥 controller 랑 뭐가 다른거
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ProductApi {
    private final ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(ProductAdditionReqDto productAdditionReqDto) throws Exception{

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1, "Successfully", productService.addProduct(productAdditionReqDto)));
    }
}
