package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.MyInfoCount;
import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.order.*;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
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

    @Override
    public List<OrderListRepDto> getOrderLists(String userId) throws Exception {

        List<OrderListRepDto> orderList = new ArrayList<>();

        orderRepository.getOrderList(userId).forEach(order -> {
            orderList.add(OrderListRepDto.builder()
                    .userId(order.getUser_id())
                    .orderDate(order.getOrder_date().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                    .orderId(order.getOrder_id())
                    .totalPrice(order.getTotal_price())
                    .orderDetailList(order.getOrderDetailList())
                    .build());


        });

        return orderList;
    }

    @Override
    public List<OrderRespDto> getOrderDetailList(String orderId, String userId) throws Exception {

        List<OrderRespDto> orderRespDto = new ArrayList<>();

        orderRepository.getOrderDetails(orderId).forEach(order -> {
            orderRespDto.add(OrderRespDto.builder()
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
                            .totalPrice(order.getTotal_price())
                            .retailPrice(order.getRetail_price())
                            .quantity(order.getQuantity())
                            .img(order.getImg())
                            .name(order.getName())
                            .productId(order.getProduct_id())
                            .build());
        });


        return orderRespDto;
    }

    @Override
    public List<MyInfoCount> getCount(String userId) throws Exception {

        List<MyInfoCount> myInfoList = new ArrayList<>();

        MyInfoCount myInfoCount1 = orderRepository.getOrderCount(userId);
        MyInfoCount myInfoCount2 = orderRepository.getCartCount(userId);
        MyInfoCount myInfoCount3 = orderRepository.getLikesCount(userId);

        myInfoList.add(myInfoCount1);
        myInfoList.add(myInfoCount2);
        myInfoList.add(myInfoCount3);

        return myInfoList;
    }

}
