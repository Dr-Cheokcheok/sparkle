package com.spakle.spakleclone20221104.dto.account;


import com.spakle.spakleclone20221104.domain.ChkId;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChkIdDto {

    @NotBlank
    private String username;

    public ChkId toUserEntity() {
        return ChkId.builder()
                .username(username)
                .build();
    }
}