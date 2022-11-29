package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.BagDto;

public interface BagService {

    public boolean bagadd(BagDto bagDto) throws Exception;

    public int deleteBag(int product_id);

}
