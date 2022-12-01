package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class OrderApi {

    private final OrderService orderService;

    @PostMapping("/order/detail")
    public ResponseEntity<?> insertOrderDtl(@RequestBody List<OrderDtlReqDto> data)throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "insertOrderDtl", orderService.addOrderDetail(data)));
    }
}
