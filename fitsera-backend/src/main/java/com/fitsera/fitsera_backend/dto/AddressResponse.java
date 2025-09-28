package com.fitsera.fitsera_backend.dto;

import lombok.Data;

@Data
public class AddressResponse {
    private Long id;
    private String label;
    private String fullAddress;
    private String province;
    private String district;
    private String ward;
    private String phone;
    private boolean isDefault;
}