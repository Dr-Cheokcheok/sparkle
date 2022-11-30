package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.BagDto;

public interface BagService {

    //장바구니 추가
    public void bagadd(BagDto bagDto) throws Exception;
    //장바구니 제품 순번 체크
    public int bagCountChk(int user_id) throws Exception;
    //제품 중복 체크
    public boolean bagOverlapChk(int user_id, int product_id) throws Exception;
}
