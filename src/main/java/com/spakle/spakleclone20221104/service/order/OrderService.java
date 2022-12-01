package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;

public interface OrderService {

    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception;

    public boolean addOrderDetail(OrderDtlReqDto orderDtlReqDto) throws Exception;


}

