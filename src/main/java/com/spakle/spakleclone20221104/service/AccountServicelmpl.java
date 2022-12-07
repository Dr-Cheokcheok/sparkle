package com.spakle.spakleclone20221104.service;

import com.spakle.spakleclone20221104.domain.ChkId;
import com.spakle.spakleclone20221104.domain.User;
import com.spakle.spakleclone20221104.dto.account.ChkIdDto;
import com.spakle.spakleclone20221104.dto.account.RegisterReqDto;
import com.spakle.spakleclone20221104.dto.account.UserMod;
import com.spakle.spakleclone20221104.dto.shop.ShopListRespDto;
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
        return result;

    }

    @Override
    public boolean register(RegisterReqDto registerReqDto) throws Exception {
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
        //패스워드 변경 없으면 password는 기존 password(암호화 o)
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

        //principalDetail set해줌
        principalDetails.setPrincipal(userMod.setUserEntity(user));

        return result != 0;
    }

    @Override
    public int like(@AuthenticationPrincipal PrincipalDetails principalDetails, Map<String, Object> map) throws Exception {
        if(principalDetails == null){
            return -1;
        }
        int userId = principalDetails.getUser().getId();
        int productId = Integer.parseInt((String) map.get("productId")); //이게 맞나???????????????
        Map<String ,Integer> newMap = new HashMap<>();
        newMap.put("userId", userId);
        newMap.put("productId", productId);

        return accountRepository.like(newMap);
    }
    @Override
    public List<ShopListRespDto> getLikes(PrincipalDetails principalDetails) throws Exception {
        List<ShopListRespDto> likeList = new ArrayList<>();

        int id = principalDetails.getUser().getId();

        accountRepository.getLikes(id).forEach(collectionProduct -> {
            likeList.add(collectionProduct.toListRespDto());
        });
        return likeList;
    }

    @Override
    public boolean deleteLikes(PrincipalDetails principalDetails, int productId) throws Exception {
        int userId = principalDetails.getUser().getId();
        return accountRepository.deleteLikes(userId,productId) != 0;
    }

    @Override
    public boolean deleteUser(PrincipalDetails principalDetails, String username) throws Exception {

        if(username == principalDetails.getUsername()) {
            int userId = principalDetails.getUser().getId();
            accountRepository.deleteUser(userId);

            return true;
        }

        return false;
    }


}
