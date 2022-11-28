package com.spakle.spakleclone20221104.controller;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderItemDto;
import com.spakle.spakleclone20221104.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {

    private final ProductService productService;

    @GetMapping("/order")
    public ResponseEntity<?> postId(@RequestParam Map<String, String> map)throws Exception{
        int id = Integer.parseInt(map.get("id"));
        int quantity = Integer.parseInt(map.get("quantity"));
        return ResponseEntity.ok(new CMRespDto<>(1, "success", productService.getProduct(id, quantity)));
    }
}
