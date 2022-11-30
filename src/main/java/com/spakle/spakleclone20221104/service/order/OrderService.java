package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderReqDto;

public interface OrderService {

    public boolean addOrder(OrderReqDto orderReqDto) throws Exception;

    public boolean addOrderDetails(OrderDtlReqDto orderDtlReqDto) throws Exception;
}
