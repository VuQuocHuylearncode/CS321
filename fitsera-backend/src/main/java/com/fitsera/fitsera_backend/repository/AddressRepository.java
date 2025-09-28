package com.fitsera.fitsera_backend.repository;

import com.fitsera.fitsera_backend.model.Address;
import com.fitsera.fitsera_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
}