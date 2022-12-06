package com.spakle.spakleclone20221104.controller.api;

import com.spakle.spakleclone20221104.aop.annotation.LogAspect;
import com.spakle.spakleclone20221104.aop.annotation.ValidAspect;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.dto.validation.ValidationSequence;
import com.spakle.spakleclone20221104.service.AccountService;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;

@Valid
@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private  final AccountService accountService;

   

    // public ResponseEntity<?> register(@Validated(ValidationSequence.class) @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) throws Exception {

    //     accountService.checkDuplicateUsername((registerReqDto.getId()));
    // accountService.register(registerReqDto)
    @LogAspect
    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated(ValidationSequence.class) @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) throws Exception{

        accountService.register(registerReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1,"Successfully registered",registerReqDto));
    }


    @GetMapping("/principal")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully get principal", principalDetails == null ? "" : principalDetails));
    }

    @PostMapping("/checkid")
    public int overlappedID(@RequestBody ChkIdDto chkIdDto) throws Exception{

        return accountService.overlappedID(chkIdDto); // 중복확인한 값을 int로 받음

    }

    @PutMapping("/modification")
    public boolean accountModify(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody Map<String, String> map) throws Exception {
        return accountService.modification(principalDetails, map);
    }

    @PostMapping("/like")
    public int like(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody Map<String, Object> map)throws Exception{
        return accountService.like(principalDetails ,map); //0이면 이미 있는거 , 1이면 정상
    }

    @GetMapping("/likes")
    public ResponseEntity<?> getLikes(@AuthenticationPrincipal PrincipalDetails principalDetails)throws Exception{
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully",accountService.getLikes(principalDetails)));
    }
}
