package com.fitsera.fitsera_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductRequest {
    private String slug;
    private String title;
    private String description;
    private String brand;
    private Long categoryId;
    private List<Long> tagIds;
    private List<String> images;
    private String attributes;
}