package com.spakle.spakleclone20221104.service;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.dto.shop.BagDao;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.repository.BagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BagServicelmpl implements BagService {

    @JacksonInject
    BagDao bagDao;

    private final BagRepository bagRepository;

    @Override
    public void bagadd(BagDto bagDto) throws Exception{

        BagVO bagEntity = bagDto.toBagEntity();
        bagDao.insert(bagEntity);

    }

    @Override
    public void insert(BagVO vo) {
        bagDao.insert(vo);
    }

    @Override
    public int deleteBag(int product_id) {
        return 0;
    }

    @Override
    public List<BagDto> getBag(String user_id) {
        return null;
    }

//    @Override
//    public List<BagVO> listBag(int user_id) {
//        return bagDao.listBag(user_id);
//    }
    @Override
    public void delete(int bagId) {
        bagDao.delete(bagId);
    }
    @Override
    public void modifyBag(BagVO vo){
        bagDao.modifyBag(vo);
    }
    @Override
    public int sumMoney(int user_id) {
        return bagDao.sumMoney(user_id);
    }
    @Override
    public int countBag(int product_id, int user_id){
        return bagDao.countBag(product_id, user_id);
    }
    @Override
    public void updateBag(BagVO vo) {
        bagDao.updateBag(vo);
    }


    @Override
    public int bagNumberChk(int user_id) throws Exception{

        int count = bagRepository.bagNumberChk(user_id);
        return count + 1;

    }

//    @Override
//    public List<BagVO> listBag(String user_id) {
//        return null;
//    }


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
}
