package com.spakle.spakleclone20221104.dto.shop;

import com.spakle.spakleclone20221104.domain.BagVO;

import java.util.List;

public interface BagDao {
    void insert(BagVO vo);

    List<BagVO> listBag(int user_id);

    void delete(int bagId);

    void modifyBag(BagVO vo);

    int sumMoney(int user_id);

    int countBag(int product_id, int user_id);

    void updateBag(BagVO vo);
}
