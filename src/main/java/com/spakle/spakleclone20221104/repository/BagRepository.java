package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.BagVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BagRepository {

    public int bagAdd(BagVO bagVO) throws Exception;

    public int deleteBag(int bagId);

}
