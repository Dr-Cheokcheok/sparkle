package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.Map;

public interface AccountService {

    public boolean checkDuplicateUsername(String id);

    public int overlappedID(ChkIdDto chkIdDto) throws Exception;

    public boolean register(RegisterReqDto registerReqDto) throws Exception;
    public boolean modification(@AuthenticationPrincipal PrincipalDetails principalDetails, Map<String ,String > map)throws Exception;
}

