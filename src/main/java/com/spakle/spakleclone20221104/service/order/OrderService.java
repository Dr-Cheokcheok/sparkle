package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.dto.order.OrderRespDto;

import java.util.List;

public interface OrderService {

    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception;

    public boolean addOrderDetail(List<OrderDtlReqDto> orderDtlReqDtos) throws Exception;

    public List<OrderRespDto> getOrderList(String userId) throws Exception;

    public OrderRespDto getOrderDetailList(String orderId) throws Exception;
}

