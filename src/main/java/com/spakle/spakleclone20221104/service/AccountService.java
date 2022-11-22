package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;

public interface AccountService {
//    public boolean checkDuplicateId(String id);

    public int overlappedID(ChkIdDto chkIdDto) throws Exception;

    public boolean register(RegisterReqDto registerReqDto) throws Exception;
}
