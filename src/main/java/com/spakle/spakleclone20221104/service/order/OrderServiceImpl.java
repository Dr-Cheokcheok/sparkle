package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.order.OrderDtlReqDto;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.dto.order.OrderRespDto;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<OrderRespDto> getOrderList(String userId) throws Exception {
        List<OrderRespDto> response = new ArrayList<>();

        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        orderRepository.getOrderList(map).forEach(order -> {
            response.add(OrderRespDto.builder()
                            .orderId(order.getOrder_id())
                            .name(order.getName())
                            .quantity(order.getQuantity())
                            .img(order.getImg())
                            .orderDate(order.getOrder_date())
                            .build());
        });

        return response;
    }

    @Override
    public OrderRespDto getOrderDetailList(String orderId) throws Exception {

        Order order = orderRepository.getOrderDetails(orderId);

        OrderRespDto orderRespDto = OrderRespDto.builder()
                    .orderId(order.getOrder_id())
                    .userId(order.getUser_id())
                    .orderDate(order.getOrder_date())
                    .ordererName(order.getOrderer_name())
                    .recipientName(order.getRecipient_name())
                    .phone(order.getPhone())
                    .postCode(order.getPost_code())
                    .address(order.getAddress())
                    .detailAddress(order.getDetail_address())
                    .shipMsg(order.getShip_msg())
                    .entrance(order.getEntrance())
                    .pet(order.getPet())
                    .totalPrice(order.getTotal_price())
                    .quantity(order.getQuantity())
                    .img(order.getImg())
                    .name(order.getName())
                    .productId(order.getProduct_id())
                    .build();

        return orderRespDto;
    }

}
