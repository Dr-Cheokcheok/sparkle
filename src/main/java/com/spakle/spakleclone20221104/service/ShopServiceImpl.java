package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.ProductListRespDto;
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
public class ShopServiceImpl implements ShopService{

    @Override   //반환은 카테고리-그룹 별로 묶인                                    //생수-2L/생수-500ml/
    public List<ProductListRespDto> getCollections(String category, String group) throws Exception {
        List<ProductListRespDto> response = new ArrayList<ProductListRespDto>();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", category);
        map.put("group", group);

        return null;
    }
}
