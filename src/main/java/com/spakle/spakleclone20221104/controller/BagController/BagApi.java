package com.spakle.spakleclone20221104.controller.BagController;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.service.BagService;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/bagchk")
    public int bagCountChk(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody BagDto bagDto) throws Exception{

        int chk = 0;

        if(principalDetails == null){
            return chk;
        }

        User user = principalDetails.getUser();
        chk = bagService.bagCountChk(user.getId());

        return chk;
    }

//    @GetMapping({userId})
//    public List<BagDetailDto> getBagList(@AuthenticationPrincipal PrincipalDetails principalDetails,@RequestBody BagDetailDto bagDetailDto) throws Exception{
//
//        return;
//    }

}
