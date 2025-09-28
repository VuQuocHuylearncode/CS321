package com.fitsera.fitsera_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductResponse {
    private Long id;
    private String slug;
    private String title;
    private String description;
    private String brand;
    private String categoryName;
    private List<String> tags;
    private List<String> images;
    private String attributes;
}