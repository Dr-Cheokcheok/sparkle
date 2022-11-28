package com.spakle.spakleclone20221104.dto.order;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDto {
    /* 주문 번호 */
    private int orderId;

    /* 배송 받는이 */
    private String addressee;

    /* 주문 회원 아이디 */
    private String memberId;

    /* 우편번호 */
    private String postcode;

    /* 회원 주소 */
    private String memberAddr1;

    /* 회원 상세주소 */
    private String memberAddr2;

    /* 주문 상태 */
    private String orderState;

    /* 주문 상품 */
    private List<OrderItemDto> orders;

    /* 배송비 */
    private int deliveryCost;

    /* 사용 포인트 */
//    private int usePoint;

    /* 주문 날짜 */
    private LocalDateTime orderDate;

    /* DB테이블 존재 하지 않는 데이터 */

    /* 판매가(모든 상품 비용) */
    private int orderSalePrice;

    /* 할인 금액 */
    private int discountAmount;

    /* 적립 포인트 */
//    private int orderSavePoint;

    /* 최종 판매 비용 */
//    private int orderFinalSalePrice;

    public void getOrderPriceInfo() {
        /* 상품 비용 & 적립포인트 */
        for (OrderItemDto order : orders) {
            orderSalePrice += order.getTotalPrice();  //
            discountAmount += order.getDiscountAmount(); //총 할인받은 가격
        }
    }
}
