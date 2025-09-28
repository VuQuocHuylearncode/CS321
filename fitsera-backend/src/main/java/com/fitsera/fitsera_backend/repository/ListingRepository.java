package com.fitsera.fitsera_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fitsera.fitsera_backend.model.Listing;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByProductId(Long productId);
    List<Listing> findBySize(String size);
    List<Listing> findByStatus(String status);

    @Query("SELECT l FROM Listing l WHERE l.id NOT IN (" +
       "SELECT lb.listing.id FROM ListingBooking lb " +
       "WHERE (lb.startDate <= :endDate AND lb.endDate >= :startDate))")
    List<Listing> findAvailableListings(@Param("startDate") LocalDate startDate,
                                    @Param("endDate") LocalDate endDate);
}