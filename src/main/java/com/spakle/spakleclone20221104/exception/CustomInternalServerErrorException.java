package com.spakle.spakleclone20221104.exception;


public class CustomInternalServerErrorException extends RuntimeException{

    public CustomInternalServerErrorException(String message){
        super(message);
    }
}
