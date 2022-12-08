package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import com.spakle.spakleclone20221104.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
            OrderDtlReqDto orderDtlReqDto = new OrderDtlReqDto(orderId, productId,quantity);
            orderDetailList.add(orderDtlReqDto);
        });

        return ResponseEntity.ok(new CMRespDto<>(1, "insertOrderDtl", orderService.addOrderDetail(orderDetailList)));
    }

    @PostMapping("/order/prepare")
    @ResponseBody
    public ResponseEntity<?> insertOrder(@RequestBody OrderInsertDto orderInsertDto) throws Exception {

        return ResponseEntity.created(null).body(new CMRespDto<>(1, "Successfully", orderService.addOrder(orderInsertDto)));
    }

    @GetMapping("/account/order/{userId}")
    public ResponseEntity<?> OrderList(@PathVariable String userId) throws Exception {
        log.info("{}", orderService.getOrderLists(userId));
        return ResponseEntity.ok(new CMRespDto<>(1, "load Successfully", orderService.getOrderLists(userId)));
    }

    @GetMapping("/order/detail/{orderId}")
    public ResponseEntity<?> getorderDtlList(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable String orderId)throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", orderService.getOrderDetailList(orderId, principalDetails.getUser().getUsername())));
    }

    @GetMapping("/order/count/{userId}")
    public ResponseEntity<?> getCounts(@PathVariable String userId) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "count load", orderService.getCount(userId)));
    }
}
