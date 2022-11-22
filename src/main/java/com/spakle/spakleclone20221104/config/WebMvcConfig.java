package com.spakle.spakleclone20221104.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

/*
이미지 파일 처리 - WebMvcConfigurer 구현 - addResourceHandlers 오버라이드
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Value("${file.path}")
    private String filePath;

    @Override//정적 리소스 관리 - 정적 파일들의 경로 잡아줌 - 어느 경로가 들어왔을때 어떻게 매핑해줄건지
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("image/**") //이주소
                .addResourceLocations("file:///" + filePath )//- 파일프로토콜 (최상위경로부터)  + filepath
                .setCachePeriod(60*60)//유지 (초)
                .resourceChain(true)//뭐지

                .addResolver(new PathResourceResolver(){
                    @Override                       //uri(resourcePath)를 utf-8로 디코딩 해주셔야 한글 경로 인식
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        resourcePath = URLDecoder.decode(resourcePath, StandardCharsets.UTF_8);
                        return super.getResource(resourcePath, location);
                    }
                });


    }
}
