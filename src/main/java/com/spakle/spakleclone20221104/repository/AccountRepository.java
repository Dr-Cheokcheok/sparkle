package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.CollectionProduct;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.UserMod;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccountRepository {

    public int save(User user);
    public User findUserByUsername(String username);

    public int overlappedID(ChkId chkId);

    public int updateUser(UserMod userMod);
    public int like(Map<String, Integer>map);//관심상품

    public List<CollectionProduct> getLikes(int id);

}
