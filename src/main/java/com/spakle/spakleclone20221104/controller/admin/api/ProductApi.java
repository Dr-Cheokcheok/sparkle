package com.spakle.spakleclone20221104.controller.admin.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.product.ProductAdditionReqDto;
import com.spakle.spakleclone20221104.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable String ProdcutId) throws Exception{

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1, "Successfully", productService))
    }
}
