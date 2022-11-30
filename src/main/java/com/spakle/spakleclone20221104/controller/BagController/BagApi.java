package com.spakle.spakleclone20221104.controller.BagController;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.service.BagService;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bag")
public class BagApi {

    private final BagService bagService;

    @PostMapping("/add")
    public ResponseEntity<?> bagAdd(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody BagDto bagDto) throws Exception{
        User user = principalDetails.getUser();
        bagDto.setUser_id(user.getId());
        bagService.bagadd(bagDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1,"Successfully registered",bagDto));
    }

    public int bagaddd(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody BagDto bagDto) throws Exception{

        int result = 0;

        if(principalDetails == null){
            return result;
        }
        User user = principalDetails.getUser();

        bagDto.setUser_id(user.getId());
        bagDto.setCount(bagService.bagCountChk(user.getId()));

        bagService.bagadd(bagDto);
        result = 1;
        return result;
    }


}
