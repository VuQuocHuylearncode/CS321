package com.fitsera.fitsera_backend.dto;

import lombok.Data;

@Data
public class ListingRequest {
    private Long productId;
    private String sku;
    private String size;
    private String color;
    private Double pricePerDay;
    private Double depositAmount;
    private String status; 
    private Integer conditionScore;
}