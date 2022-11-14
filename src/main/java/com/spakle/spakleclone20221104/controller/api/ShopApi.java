package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ShopApi {

    private final ProductService productService;

    @GetMapping("/product/{category}")
    public ResponseEntity<?> GetProduct(@PathVariable String category) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Load Successfully", productService.addProduct(null)));
    }
}
