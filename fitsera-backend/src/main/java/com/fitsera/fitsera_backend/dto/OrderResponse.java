package com.fitsera.fitsera_backend.dto;


import java.util.List;

public class OrderResponse {
    private Long id;
    private String status;
    private List<OrderItemResponse> items;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }
    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}