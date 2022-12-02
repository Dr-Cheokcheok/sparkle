package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderRepository {

    public int saveOrder(Order order) throws Exception;

    public int saveOrderDtl(List<OrderDetail> orderDetail) throws Exception;

    public List<Order> getOrderList(Map<String, Object> map) throws Exception;

    public Order getOrderDetails(String orderId) throws Exception;
}
