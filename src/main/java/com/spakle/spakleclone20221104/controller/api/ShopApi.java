package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.service.ProductService;
import com.spakle.spakleclone20221104.service.ShopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ShopApi {

    private final ShopService shopService;

    @GetMapping("/product/category/{category}")
    public ResponseEntity<?> GetProduct(@PathVariable String category) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Load Successfully", shopService.getCollections(category)));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> GetProduct(@PathVariable int id) throws Exception {
        log.info("{}", shopService.getProductDetails(id));
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", shopService.getProductDetails(id)));
    }
}
