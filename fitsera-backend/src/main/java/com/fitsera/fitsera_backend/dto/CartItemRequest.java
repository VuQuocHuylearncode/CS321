package com.fitsera.fitsera_backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CartItemRequest {
    private Long listingId;
    private LocalDate rentalStart;
    private LocalDate rentalEnd;
    private Integer qty; 
}