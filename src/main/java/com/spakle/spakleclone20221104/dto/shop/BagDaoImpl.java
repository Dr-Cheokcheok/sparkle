package com.spakle.spakleclone20221104.dto.shop;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.spakle.spakleclone20221104.domain.BagVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class BagDaoImpl implements BagDao{
    @JacksonInject
    SqlSession sqlSession;

    @Override
    public void insert(BagVO vo) {
        sqlSession.insert("cart.insertBag", vo);
    }
    @Override
    public List<BagVO> listBag(int user_id) {
        return sqlSession.selectList("cart.listBag", user_id);
    }
    @Override
    public void delete(int bagId) {
        sqlSession.delete("cart.deleteBag", bagId);
    }
    @Override
    public void modifyBag(BagVO vo) {
        sqlSession.update("cart.modify", vo);
    }
    @Override
    public int sumMoney(int user_id) {
        sqlSession.selectOne("cart.sumMoney", user_id);
        return sqlSession.selectOne("cart.sumMoney", user_id);
    }
    @Override
    public int countBag(int product_id, int user_id) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("product_id", product_id);
        map.put("user_id", user_id);
        return sqlSession.selectOne("cart.countBag", map);
    }
    @Override
    public void updateBag(BagVO vo) {
        sqlSession.update("cart.sumBag", vo);
    }
}
