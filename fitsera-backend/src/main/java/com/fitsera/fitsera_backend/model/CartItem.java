package com.fitsera.fitsera_backend.model;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Table(name = "cart_items")
@Data @NoArgsConstructor @AllArgsConstructor
public class CartItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    private LocalDate rentalStart;
    private LocalDate rentalEnd;
    private int qty;

    private double pricePerDay;

    public int getDays() {
        if (rentalStart == null || rentalEnd == null) return 0;
        long d = ChronoUnit.DAYS.between(rentalStart, rentalEnd) + 1; 
        return (int) Math.max(d, 0);
    }

    public double getTotalPrice() {
        return getDays() * pricePerDay * Math.max(qty, 1);
    }
}