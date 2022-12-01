package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class OrderApi {

    private final OrderService orderService;

    @PostMapping("/order")
    public String insertOrder(@RequestBody List<Map<String,Object>> data){
        log.info("{}", data);
        data.forEach(dataMap -> {
            Integer i = (Integer) dataMap.get("product_id");
            String id = (String) dataMap.get("order_id");
            Integer quantity = (Integer) dataMap.get("quantity");

        });


        return data.toString();
    }
}
