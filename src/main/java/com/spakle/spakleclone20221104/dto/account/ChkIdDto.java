package com.spakle.spakleclone20221104.dto.account;


import com.spakle.spakleclone20221104.domain.ChkId;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChkIdDto {

    @NotBlank
    private String id;

    public ChkId toUserEntity() {
        return ChkId.builder()
                .id(id)

                .build();
    }
}