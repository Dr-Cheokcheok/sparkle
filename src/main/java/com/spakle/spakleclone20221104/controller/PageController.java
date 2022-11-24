package com.spakle.spakleclone20221104.controller;

import groovyjarjarantlr4.v4.codegen.model.ModelElement;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PageController {
    @GetMapping("/product/{productId}")
    public String loadProduct(@PathVariable int productId){
        return "shop/product";
    }

    @GetMapping("/shop/{category}")
    public String loadCollection(@PathVariable String category){return "shop/shop";}

    @GetMapping("/index")
    public String loadMain() {return "index/index";}

    @GetMapping("/bag")
    public String loadBag() {return "bag";}

    @GetMapping("/admin/index")
    public String loadAdmin() {return "admin-page";}
}
