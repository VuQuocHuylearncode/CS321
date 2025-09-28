package com.fitsera.fitsera_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsera.fitsera_backend.dto.CartItemRequest;
import com.fitsera.fitsera_backend.dto.CartResponse;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.UserRepository;
import com.fitsera.fitsera_backend.service.CartService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    private User me(Authentication auth) {
        String email = auth.getName(); 
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<CartResponse> getMyCart(Authentication auth) {
        return ResponseEntity.ok(cartService.getMyCart(me(auth)));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(@RequestBody CartItemRequest req, Authentication auth) {
        return ResponseEntity.ok(cartService.addItem(me(auth), req));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(@PathVariable Long itemId,
                                                   @RequestBody CartItemRequest req,
                                                   Authentication auth) {
        return ResponseEntity.ok(cartService.updateItem(me(auth), itemId, req));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(@PathVariable Long itemId, Authentication auth) {
        return ResponseEntity.ok(cartService.removeItem(me(auth), itemId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clear(Authentication auth) {
        cartService.clear(me(auth));
        return ResponseEntity.noContent().build();
    }
}