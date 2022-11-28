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
    public boolean bagadd(BagDto bagDto) throws Exception{

        BagVO bagEntity = bagDto.toBagEntity();
        int result = bagRepository.bagAdd(bagEntity);
        return  result != 0;

    }
}
