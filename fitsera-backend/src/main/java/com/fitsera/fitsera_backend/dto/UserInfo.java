package com.fitsera.fitsera_backend.dto;

import java.util.Set;

import lombok.Data;

@Data
public class UserInfo {
    private Long id;
    private String email;
    private Set<String> roles;
    private String fullName;
}