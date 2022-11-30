package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.repository.BagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BagServicelmpl implements BagService {

    private final BagRepository bagRepository;

    @Override
    public void bagadd(BagDto bagDto) throws Exception{

        BagVO bagEntity = bagDto.toBagEntity();
        bagRepository.bagAdd(bagEntity);
//        int result = bagRepository.bagAdd(bagEntity);
//        return result != 0;

    }

    @Override
    public int bagCountChk(int user_id) throws Exception{

        int count = bagRepository.bagCountChk(user_id);
        return count;

    }

    @Override
    public boolean bagOverlapChk(int user_id, int product_id) throws Exception{
        boolean chk = bagRepository.bagOverlapChk(user_id, product_id);
        return chk;
    }
}
