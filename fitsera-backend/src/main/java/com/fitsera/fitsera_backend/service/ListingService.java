package com.fitsera.fitsera_backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fitsera.fitsera_backend.dto.ListingRequest;
import com.fitsera.fitsera_backend.dto.ListingResponse;
import com.fitsera.fitsera_backend.model.Listing;
import com.fitsera.fitsera_backend.model.ListingStatus;
import com.fitsera.fitsera_backend.model.Product;
import com.fitsera.fitsera_backend.repository.ListingRepository;
import com.fitsera.fitsera_backend.repository.ProductRepository;

@Service
public class ListingService {
    private final ListingRepository listingRepository;
    private final ProductRepository productRepository;

    public ListingService(ListingRepository listingRepository, ProductRepository productRepository) {
        this.listingRepository = listingRepository;
        this.productRepository = productRepository;
    }

    public ListingResponse createListing(ListingRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Listing listing = Listing.builder()
                .sku(request.getSku())
                .product(product)
                .size(request.getSize())
                .color(request.getColor())
                .pricePerDay(request.getPricePerDay())
                .depositAmount(request.getDepositAmount())
                .status(ListingStatus.valueOf(request.getStatus()))
                .conditionScore(request.getConditionScore())
                .build();

        Listing saved = listingRepository.save(listing);
        return mapToResponse(saved);
    }

    public List<ListingResponse> getAllListings() {
        return listingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ListingResponse getListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        return mapToResponse(listing);
    }

    private ListingResponse mapToResponse(Listing listing) {
        ListingResponse res = new ListingResponse();
        res.setId(listing.getId());
        res.setSku(listing.getSku());
        res.setProductId(listing.getProduct().getId());
        res.setProductTitle(listing.getProduct().getTitle());
        res.setSize(listing.getSize());
        res.setColor(listing.getColor());
        res.setPricePerDay(listing.getPricePerDay());
        res.setDepositAmount(listing.getDepositAmount());
        res.setStatus(listing.getStatus().name());
        res.setConditionScore(listing.getConditionScore());
        return res;
    }

    public Listing updateListing(Long id, Listing update) {
        Listing existing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        existing.setSku(update.getSku());
        existing.setSize(update.getSize());
        existing.setColor(update.getColor());
        existing.setPricePerDay(update.getPricePerDay());
        existing.setDepositAmount(update.getDepositAmount());
        existing.setStatus(update.getStatus());
        existing.setConditionScore(update.getConditionScore());
        return listingRepository.save(existing);
    }

    public void deleteListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listingRepository.delete(listing);
    }

    public List<Listing> filterListings(Long productId, String size, String status,
                                        LocalDate from, LocalDate to) {
        if (productId != null) return listingRepository.findByProductId(productId);
        if (size != null) return listingRepository.findBySize(size);
        if (status != null) return listingRepository.findByStatus(status);
        if (from != null && to != null) return listingRepository.findAvailableListings(from, to);
        return listingRepository.findAll();
    }
}