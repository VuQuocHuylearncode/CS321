package com.fitsera.fitsera_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsera.fitsera_backend.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}