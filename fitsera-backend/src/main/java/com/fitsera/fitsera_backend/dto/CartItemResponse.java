package com.fitsera.fitsera_backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CartItemResponse {
    private Long id;
    private Long listingId;
    private String listingSku;
    private Double pricePerDay;
    private Integer qty;
    private LocalDate rentalStart;
    private LocalDate rentalEnd;
    private Integer days;
    private Double totalPrice;
}