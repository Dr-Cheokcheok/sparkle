package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {

    public int saveOrder(Order order) throws Exception;

    public int saveOrderDtl(OrderDetail orderDetail) throws Exception;

}
