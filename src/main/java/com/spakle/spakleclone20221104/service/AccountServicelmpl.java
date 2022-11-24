package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
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

//    @Override
//    public boolean checkDuplicateId(String id) {
//
//        User user = accountRepository.findUserById(id);
//        if(user != null) {
//            Map<String, String> errorMap = new HashMap<String, String>();
//            errorMap.put("duplicateFlag", "이미 가입된 아이디입니다.");
//            throw new CustomValidationException("DuplicateId Error", errorMap);
//        }
//
//        return true;
//    }
    @Override
    public boolean checkDuplicateUsername(String id) {

        User user = accountRepository.findUserByUsername(id);
        if(user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("duplicateFlag", "이미 가입된 아이디입니다.");
            throw new CustomValidationException("DuplicateUsername Error", errorMap);
        }
        return true;
    }

    public int overlappedID(ChkIdDto chkIdDto) throws Exception{
        ChkId userEntity = chkIdDto.toUserEntity();
        int result = accountRepository.overlappedID(userEntity);
//        int result = accountRepository.overlappedID(chkIdDto.toUserEntity());
        return result;

    }

    @Override
    public boolean register(RegisterReqDto registerReqDto) throws Exception {

        // User user = registerReqDto.toUserEntity();
        // int result = accountRepository.save(user);
        // if (result == 0) {
        //     throw new CustomInternalServerErrorException("회원가입중 문제가 발생하였습니다.");
        // }
        // return true;

        User userEntity = registerReqDto.toUserEntity();
        int result = accountRepository.save(userEntity);

        return  result != 0;
    }
}
