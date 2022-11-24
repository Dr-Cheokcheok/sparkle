package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.exception.CustomValidationException;
import com.spakle.spakleclone20221104.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServicelmpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public int overlappedID(ChkIdDto chkIdDto) throws Exception{
        ChkId userEntity = chkIdDto.toUserEntity();
        int result = accountRepository.overlappedID(userEntity);
//        int result = accountRepository.overlappedID(chkIdDto.toUserEntity());
        return result;
    }

    @Override
    public boolean register(RegisterReqDto registerReqDto) throws Exception {
        User userEntity = registerReqDto.toUserEntity();
        int result = accountRepository.save(userEntity);
//        return accountRepository.save(registerReqDto.toUserEntity()) != 0;
        return  result != 0;
    }
}
