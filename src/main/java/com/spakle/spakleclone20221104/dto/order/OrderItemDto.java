package com.spakle.spakleclone20221104.dto.order;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class OrderItemDto {


    /* 상품 번호 */
    private int productId;
    /* 상품 이름 */
    private String name;
    /* 주문 수량 */
    private int quantity;

    /* 상품의 원가 */
    private int originPrice;

    /* 상품 한개 가격 (할인가)  */
    private int retailPrice;

    /* 상품 할인 율 - 표시용 */
    private double rate;


    /* DB테이블 존재 하지 않는 데이터 */

    private String img;

    /* 할인받은 금액 */
    private int discountAmount;

    /* 총 가격(할인 적용된 가격 * 주문 수량) */
    private int totalPrice;


}
