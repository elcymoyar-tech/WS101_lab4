package com.example.restapi;

import lombok.Data;

@Data
public class NewProduct {
    private String sku;
    private String name;
    private Double price;
    private int quantity;
}
