package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.BagList;
import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.order.OrderReqDto;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.repository.BagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BagServicelmpl implements BagService {

    private final BagRepository bagRepository;

    @Override
    public void bagadd(BagDto bagDto) throws Exception{

        BagVO bagEntity = bagDto.toBagEntity();
        bagRepository.bagAdd(bagEntity);

    }

    @Override
    public int bagNumberChk(int user_id) throws Exception{

        int count = bagRepository.bagNumberChk(user_id);
        return count + 1;

    }

    @Override
    public boolean bagOverlapChk(int user_id, int product_id) throws Exception{
        boolean chk = bagRepository.bagOverlapChk(user_id, product_id);
        return chk;
    }

    @Override
    public int bagCountChk(int user_id) throws Exception{
        int count = bagRepository.bagCountChk(user_id);
        return count;
    }

    @Override
    public List<BagDetailDto> getBagList(int user_id) throws Exception{
        log.info("{}", user_id);

        List<BagDetailDto> bagList = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();

        bagRepository.getBagList(map, user_id).forEach(Bag -> {
            bagList.add(Bag.toRespDto());
        });
        return bagList;
    }

    @Override
    public List<OrderReqDto> getOrderList(int user_id) throws Exception{
        List<OrderReqDto> orderList = new ArrayList<>();
        bagRepository.getOrderList(user_id).forEach(BagList -> {
            orderList.add(BagList.toItemsDto());
        });

        return orderList;
    }
}
