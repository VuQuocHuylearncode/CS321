package com.fitsera.fitsera_backend.service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsera.fitsera_backend.dto.CartItemRequest;
import com.fitsera.fitsera_backend.dto.CartItemResponse;
import com.fitsera.fitsera_backend.dto.CartResponse;
import com.fitsera.fitsera_backend.model.Cart;
import com.fitsera.fitsera_backend.model.CartItem;
import com.fitsera.fitsera_backend.model.Listing;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.CartItemRepository;
import com.fitsera.fitsera_backend.repository.CartRepository;
import com.fitsera.fitsera_backend.repository.ListingBookingRepository;
import com.fitsera.fitsera_backend.repository.ListingRepository;
import com.fitsera.fitsera_backend.repository.UserRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ListingBookingRepository listingBookingRepository; 

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       ListingRepository listingRepository,
                       ListingBookingRepository listingBookingRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
        this.listingBookingRepository = listingBookingRepository;
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart c = new Cart();
            c.setUser(user);
            c.setUpdatedAt(LocalDateTime.now());
            return cartRepository.save(c);
        });
    }

    public CartResponse getMyCart(User user) {
        Cart cart = getOrCreateCart(user);
        return toResponse(cart);
    }

    @Transactional
    public CartResponse addItem(User user, CartItemRequest req) {
        if (req.getRentalStart() == null || req.getRentalEnd() == null || !req.getRentalEnd().isAfter(req.getRentalStart().minusDays(0))) {
            throw new RuntimeException("Invalid date range");
        }
        Listing listing = listingRepository.findById(req.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        boolean conflict = listingBookingRepository.existsOverlap(
                listing.getId(), req.getRentalStart(), req.getRentalEnd()
        );
        if (conflict) throw new RuntimeException("Listing not available in requested range");

        Cart cart = getOrCreateCart(user);

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setListing(listing);
        item.setRentalStart(req.getRentalStart());
        item.setRentalEnd(req.getRentalEnd());
        item.setQty(req.getQty() == null || req.getQty() < 1 ? 1 : req.getQty());
        item.setPricePerDay(listing.getPricePerDay());

        cart.getItems().add(item);
        cart.setUpdatedAt(LocalDateTime.now());
        Cart saved = cartRepository.save(cart); 

        return toResponse(saved);
    }

    @Transactional
    public CartResponse updateItem(User user, Long itemId, CartItemRequest req) {
        Cart cart = getOrCreateCart(user);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (req.getRentalStart() != null) item.setRentalStart(req.getRentalStart());
        if (req.getRentalEnd() != null)   item.setRentalEnd(req.getRentalEnd());
        if (req.getQty() != null && req.getQty() > 0) item.setQty(req.getQty());

        if (item.getRentalStart() == null || item.getRentalEnd() == null ||
                !item.getRentalEnd().isAfter(item.getRentalStart().minusDays(0))) {
            throw new RuntimeException("Invalid date range");
        }

        boolean conflict = listingBookingRepository.existsOverlap(
                item.getListing().getId(), item.getRentalStart(), item.getRentalEnd()
        );
        if (conflict) throw new RuntimeException("Listing not available in requested range");

        cart.setUpdatedAt(LocalDateTime.now());
        Cart saved = cartRepository.save(cart);
        return toResponse(saved);
    }

    @Transactional
    public CartResponse removeItem(User user, Long itemId) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().removeIf(i -> i.getId().equals(itemId));
        cart.setUpdatedAt(LocalDateTime.now());
        Cart saved = cartRepository.save(cart);
        return toResponse(saved);
    }

    @Transactional
    public void clear(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    private CartResponse toResponse(Cart cart) {
        CartResponse res = new CartResponse();
        res.setId(cart.getId());
        res.setUserId(cart.getUser().getId());
        res.setUpdatedAt(cart.getUpdatedAt());

        var items = cart.getItems().stream().map(i -> {
            CartItemResponse ir = new CartItemResponse();
            ir.setId(i.getId());
            ir.setListingId(i.getListing().getId());
            ir.setListingSku(i.getListing().getSku());
            ir.setPricePerDay(i.getPricePerDay());
            ir.setQty(i.getQty());
            ir.setRentalStart(i.getRentalStart());
            ir.setRentalEnd(i.getRentalEnd());
            ir.setDays(i.getDays());
            ir.setTotalPrice(i.getTotalPrice());
            return ir;
        }).collect(Collectors.toList());
        res.setItems(items);
        res.setSubtotal(items.stream().mapToDouble(CartItemResponse::getTotalPrice).sum());
        return res;
    }
}