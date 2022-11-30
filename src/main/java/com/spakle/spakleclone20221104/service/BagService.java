package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.BagDto;

import java.util.List;

public interface BagService {

    //장바구니 추가
    public void bagadd(BagDto bagDto) throws Exception;

    public int deleteBag(int product_id);

    public List<BagDto> getBag(String user_id);

    public int bagCountChk(int user_id) throws Exception;
}
