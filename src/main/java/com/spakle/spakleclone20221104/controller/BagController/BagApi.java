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
    public int bagadd(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody BagDto bagDto) throws Exception{

        int result = 0;

        if(principalDetails == null){
            return result;
        }
        User user = principalDetails.getUser();

        bagDto.setUser_id(user.getId());
        //해당 제품이 이미 장바구니에 존재하는지 체크
        if(bagService.bagOverlapChk(bagDto.getUser_id(),bagDto.getProduct_id())){
            return result = 2;
        }
        //제품 순번 체크
        bagDto.setCount(bagService.bagNumberChk(user.getId()));

        bagService.bagadd(bagDto);
        result = 1;
        return result;
    }

//    @PostMapping("/bagchk")
//    public String bagCountChk(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody BagDto bagDto) throws Exception{
//        if(principalDetails == null){
//            return "";
//        }
//
//        User user = principalDetails.getUser();
//        if(bagService.bagCountChk(user.getId()) == "0"){
//            return "";
//        } else {
//            return bagService.bagCountChk(user.getId());
//        }
//    }

}
