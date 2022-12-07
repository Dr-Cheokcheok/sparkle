package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.MyInfoCount;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.dto.order.OrderListRepDto;
import com.spakle.spakleclone20221104.dto.order.OrderRespDto;

import java.util.List;

public interface OrderService {

    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception;

    public boolean addOrderDetail(List<OrderDtlReqDto> orderDtlReqDtos) throws Exception;

    public List<OrderListRepDto> getOrderLists(String userId) throws Exception;

    public List<OrderRespDto> getOrderDetailList(String orderId, String userId) throws Exception;

    public List<MyInfoCount> getCount(String userId) throws Exception;
}

