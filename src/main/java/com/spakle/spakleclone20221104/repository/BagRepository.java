package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.Bag;
import com.spakle.spakleclone20221104.domain.BagVO;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BagRepository {

    public void bagAdd(BagVO bagVO) throws Exception;

    public int bagNumberChk(int user_id) throws Exception;

    public boolean bagOverlapChk(int user_id, int product_id) throws Exception;

    public int bagCountChk(int user_id) throws Exception;

    public int deleteBag(int bagId);
    public List<Bag> getBagList(Map<String, Object> map, int user_id) throws Exception;

}
