package com.spakle.spakleclone20221104.service.order;

import com.spakle.spakleclone20221104.domain.order.Order;
import com.spakle.spakleclone20221104.domain.order.OrderDetail;
import com.spakle.spakleclone20221104.dto.order.OrderInsertDto;
import com.spakle.spakleclone20221104.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;


    @Override
    public boolean addOrder(OrderInsertDto orderInsertDto) throws Exception {

        List<Integer> orderDetails = orderInsertDto.getOrderDetails();

        List<OrderDetail> orderDtls = null;

        Order order = orderInsertDto.toOrderEntity();


        return true;
    }

    private List<OrderDetail> getProductIds(List<Integer> orderDetails, int orderId) throws Exception {

//
//       OrderDetail orderDetail = OrderDetail.builder()
//               .order_id(orderId)
//               .product_id(productId)
//               .quantity(quantity)
//               .total_price(totalPrice)
//               .build();

        return null;
    }

}
