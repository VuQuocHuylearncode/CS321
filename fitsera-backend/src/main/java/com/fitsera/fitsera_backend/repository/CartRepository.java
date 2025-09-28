package com.fitsera.fitsera_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsera.fitsera_backend.model.Cart;
import com.fitsera.fitsera_backend.model.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}