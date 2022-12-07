package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.order.MyInfoCount;
import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.domain.order.OrderList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {

    public int saveOrder(Order order) throws Exception;

    public int saveOrderDtl(List<OrderDetail> orderDetail) throws Exception;

    public List<OrderList> getOrderList(String userId) throws Exception;

    public List<Order> getOrderDetails(String orderId) throws Exception;

    public MyInfoCount getCounts(String userId) throws Exception;
}
