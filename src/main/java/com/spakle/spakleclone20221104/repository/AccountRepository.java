package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.UserMod;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public int save(User user);
    public User findUserByUsername(String username);
    public int overlappedID(ChkId chkId);

    public int updateUser(UserMod userMod);

}
