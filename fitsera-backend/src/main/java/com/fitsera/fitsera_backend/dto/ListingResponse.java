package com.fitsera.fitsera_backend.dto;

import lombok.Data;

@Data
public class ListingResponse {
    private Long id;
    private String sku;
    private Long productId;
    private String productTitle;
    private String size;
    private String color;
    private Double pricePerDay;
    private Double depositAmount;
    private String status;
    private Integer conditionScore;
}