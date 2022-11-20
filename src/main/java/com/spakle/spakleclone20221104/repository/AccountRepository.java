package com.spakle.spakleclone20221104.repository;

import com.spakle.spakleclone20221104.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public User findUserByEmail(String email) throws Exception;
    public int saveUser(User user) throws Exception;
}
