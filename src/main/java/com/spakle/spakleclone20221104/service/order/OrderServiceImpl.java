package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;


    @Override
    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception {

        int resultCount = 0;

        Order order = orderInsertDto.toOrderEntity();
        resultCount = orderRepository.saveOrder(order);

        if (resultCount == 0) {
            throw new CustomInternalServerErrorException("결제 정보 등록 실패");
        }

        return true;
    }

    @Override
    public boolean addOrderDetail(List<OrderDtlReqDto> orderDtlReqDtos) throws Exception {
        List<OrderDetail> orderDtlList = new ArrayList<>();
        orderDtlReqDtos.forEach(orderDtlReqDto -> {
            orderDtlList.add(orderDtlReqDto.toOrderDtlEntity());
        });

        int resultCount = 0;
        resultCount = orderRepository.saveOrderDtl(orderDtlList);

        if(resultCount == 0){
            return false;
        }else {
            return true;
        }

    }

}
