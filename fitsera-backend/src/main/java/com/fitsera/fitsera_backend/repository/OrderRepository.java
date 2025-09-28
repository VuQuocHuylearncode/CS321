package com.fitsera.fitsera_backend.repository;

import com.fitsera.fitsera_backend.model.Order;
import com.fitsera.fitsera_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}