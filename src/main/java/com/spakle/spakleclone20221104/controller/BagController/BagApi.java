package com.spakle.spakleclone20221104.controller.BagController;

import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.CMRespDto;
import com.spakle.spakleclone20221104.dto.order.OrderBagDelDto;
import com.spakle.spakleclone20221104.dto.shop.BagDetailDto;
import com.spakle.spakleclone20221104.dto.shop.BagDto;
import com.spakle.spakleclone20221104.service.BagService;
import com.spakle.spakleclone20221104.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public int bagCountChk(@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{

        int chk = 0;

        if(principalDetails == null){
            return chk;
        }

        User user = principalDetails.getUser();
        chk = bagService.bagCountChk(user.getId());

        return chk;
    }

    @GetMapping("/userbag")
    public ResponseEntity<?> getBagList(@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception{
        if(principalDetails == null){
            return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully", bagService.getBagList(0)));
        }

        User user = principalDetails.getUser();
        log.info("{}", bagService.getBagList(user.getId()));
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully", bagService.getBagList(user.getId())));
    }
    @DeleteMapping("/bagdelete")
    public ResponseEntity<?> bagDelete(@RequestBody List<Map<String , Object>> data) throws Exception{
        List<OrderBagDelDto> bagDelList = new ArrayList<>();

        data.forEach(bagDel -> {
            Integer userId = (Integer) bagDel.get("user_id");
            Integer productId = (Integer) bagDel.get("product_id");
            Integer quantity = (Integer) bagDel.get("quantity");

            OrderBagDelDto orderBagDelDto = new OrderBagDelDto(userId, productId, quantity);
            bagDelList.add(orderBagDelDto);

        });

        return ResponseEntity.ok(new CMRespDto<>(1, "insertOrderDtl", bagService.bagDelList(bagDelList)));

    }

}
