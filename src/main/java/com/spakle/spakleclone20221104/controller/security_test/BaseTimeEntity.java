package com.spakle.spakleclone20221104.controller.security_test;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BaseTimeEntity {

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
