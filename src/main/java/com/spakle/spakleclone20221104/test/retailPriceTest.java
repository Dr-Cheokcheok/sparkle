package com.spakle.spakleclone20221104.test;

public class retailPriceTest {
    public static void main(String[] args) {
        double originPrice = 30000;
        double retailPrice = 19900;
        double discountedAmount;
        int rate;
        discountedAmount =  originPrice - retailPrice;
        rate = (int)(discountedAmount / originPrice * 100);

        System.out.println(rate + "%");


    }
}
