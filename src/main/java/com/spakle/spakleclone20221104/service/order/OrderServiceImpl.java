package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderReqDto;
import com.spakle.spakleclone20221104.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;


    @Override
    public boolean addOrder(OrderReqDto orderReqDto) throws Exception {

        Order order = orderReqDto.toOrderEntity();

        return true;
    }

    @Override
    public boolean addOrderDetails(OrderDtlReqDto orderDtlReqDto) throws Exception {

        OrderDetail orderDetail = orderDtlReqDto.toOrderDtlEntity();

        return true;
    }
}
