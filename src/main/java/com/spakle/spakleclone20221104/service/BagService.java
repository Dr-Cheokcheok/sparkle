package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;

import java.util.List;

public interface BagService {

    //장바구니 추가
    public void bagadd(BagDto bagDto) throws Exception;
    //장바구니 제거
    public int deleteBag(int product_id);

    public List<BagDto> getBag(String user_id);

    //장바구니 제품 순번 체크
    public int bagNumberChk(int user_id) throws Exception;
    //제품 중복 체크
    public boolean bagOverlapChk(int user_id, int product_id) throws Exception;
    //헤더 장바구니 품목 수량 표시
    public int bagCountChk(int user_id) throws Exception;

    //장바구니 리스트 불러오기
    public List<BagDetailDto> getBagList(int user_id) throws Exception;
}
