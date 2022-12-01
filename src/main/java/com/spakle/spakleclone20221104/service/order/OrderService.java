package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;

import java.util.List;

public interface OrderService {

    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception;

    public boolean addOrderDetail(List<OrderDtlReqDto> orderDtlReqDtos) throws Exception;


}

