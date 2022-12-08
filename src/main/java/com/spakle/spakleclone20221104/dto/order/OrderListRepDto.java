package com.spakle.spakleclone20221104.dto.order;

import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderListRepDto {

    private String userId;
    private String orderId;
    private String orderDate;
    private int totalPrice;
    private List<OrderDetail> orderDetailList;
}
