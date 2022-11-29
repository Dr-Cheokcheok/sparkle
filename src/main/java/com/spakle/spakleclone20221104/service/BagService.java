package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.BagDto;

public interface BagService {

    //장바구니 추가
    public void bagadd(BagDto bagDto) throws Exception;

    public int bagCountChk(int user_id) throws Exception;
}
