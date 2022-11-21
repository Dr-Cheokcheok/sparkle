package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;

public interface AccountService {
    public boolean checkDuplicateEmail(String email);
    public boolean register(RegisterReqDto registerReqDto) throws Exception;
}

