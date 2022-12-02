package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.dto.account.UserMod;
import com.spakle.spakleclone20221104.exception.CustomInternalServerErrorException;
import com.spakle.spakleclone20221104.exception.CustomValidationException;
import com.spakle.spakleclone20221104.repository.AccountRepository;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
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

    @Override
    public boolean modification(@AuthenticationPrincipal PrincipalDetails principalDetails, Map<String, String> map) throws Exception {


        User user = principalDetails.getUser();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        int event = 0;
        int result = 0;

        if(map.get("event").equals("sns")){
           event = 1;
        }

        String password = map.get("password");
        if(password.equals("off")){
            password = user.getPassword();
        }else{
            password = bCryptPasswordEncoder.encode(password);
        }
        log.info("password: {}", password);



        UserMod userMod = UserMod.builder()
                .id(user.getId())
                .name(map.get("name"))
                .password(password)
                .phone(map.get("phone"))
                .event_sosick(event)
                .post_code(map.get("postcode"))
                .address(map.get("address"))
                .detail_address(map.get("detailAddress"))
                .build();

        result = accountRepository.updateUser(userMod);
        return result != 0;
    }
}
