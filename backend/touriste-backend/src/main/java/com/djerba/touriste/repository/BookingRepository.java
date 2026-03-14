package com.djerba.touriste.repository;

import com.djerba.touriste.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    // Custom query to get all bookings for a specific provider by joining with Service table
    @Query("SELECT b FROM Booking b WHERE b.service.provider.id = :providerId")
    List<Booking> findBookingsByProviderId(@Param("providerId") Long providerId);
}
