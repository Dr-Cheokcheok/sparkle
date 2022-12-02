package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/order/detail")
    public ResponseEntity<?> insertOrderDtl(@RequestBody List<Map<String , Object>> data)throws Exception{
        List<OrderDtlReqDto> orderDetailList = new ArrayList<>();

        data.forEach(orderDtl -> {
            String orderId = (String) orderDtl.get("order_id");
            Integer productId = (Integer) orderDtl.get("product_id");
            Integer quantity = (Integer) orderDtl.get("quantity");
            OrderDtlReqDto orderDtlReqDto = new OrderDtlReqDto(orderId, productId,quantity );
            orderDetailList.add(orderDtlReqDto);
        });

        return ResponseEntity.ok(new CMRespDto<>(1, "insertOrderDtl", orderService.addOrderDetail(orderDetailList)));
    }
}
