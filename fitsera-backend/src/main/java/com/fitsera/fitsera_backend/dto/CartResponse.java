package com.fitsera.fitsera_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CartResponse {
    private Long id;
    private Long userId;
    private LocalDateTime updatedAt;
    private List<CartItemResponse> items;
    private Double subtotal;
}