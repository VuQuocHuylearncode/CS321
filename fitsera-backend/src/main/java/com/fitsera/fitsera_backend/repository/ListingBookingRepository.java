package com.fitsera.fitsera_backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fitsera.fitsera_backend.model.ListingBooking;

public interface ListingBookingRepository extends JpaRepository<ListingBooking, Long> {
    @Query("""
        SELECT COUNT(lb) > 0 FROM ListingBooking lb
        WHERE lb.listing.id = :listingId
          AND lb.startDate <= :endDate
          AND lb.endDate   >= :startDate
    """)
    boolean existsOverlap(Long listingId, LocalDate startDate, LocalDate endDate);
}