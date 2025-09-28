package com.fitsera.fitsera_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsera.fitsera_backend.dto.AddressRequest;
import com.fitsera.fitsera_backend.dto.AddressResponse;
import com.fitsera.fitsera_backend.dto.UserInfo;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.service.AddressService;
import com.fitsera.fitsera_backend.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final AddressService addressService;

    public UserController(UserService userService, AddressService addressService) {
        this.userService = userService;
        this.addressService = addressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User update) {
        return ResponseEntity.ok(userService.updateUser(userId, update));
    }

    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<AddressResponse>> getAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getUserAddresses(userId));
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<AddressResponse> addAddress(@PathVariable Long userId, @RequestBody AddressRequest req) {
        return ResponseEntity.status(201).body(addressService.addAddress(userId, req));
    }

    @PutMapping("/{userId}/addresses/{addrId}")
    public ResponseEntity<AddressResponse> updateAddress(
            @PathVariable Long userId,
            @PathVariable Long addrId,
            @RequestBody AddressRequest req) {
        return ResponseEntity.ok(addressService.updateAddress(userId, addrId, req));
    }

    @DeleteMapping("/{userId}/addresses/{addrId}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable Long userId,
            @PathVariable Long addrId) {
        addressService.deleteAddress(userId, addrId);
        return ResponseEntity.noContent().build();
    }
}