package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.service.ProductService;
import com.spakle.spakleclone20221104.service.ShopService;
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

    private final ShopService shopService;

    @GetMapping("/product/{category}")
    public ResponseEntity<?> GetProduct(@PathVariable String category, String group) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Load Successfully", shopService.getCollections(category, group)));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> GetProduct(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", shopService.getProductDetails(id)));
    }
}
