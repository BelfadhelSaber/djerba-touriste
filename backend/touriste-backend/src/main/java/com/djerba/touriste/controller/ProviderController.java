package com.djerba.touriste.controller;

import com.djerba.touriste.model.*;
import com.djerba.touriste.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderController {

    private final ServiceRepository serviceRepository;
    private final BookingRepository bookingRepository;
    private final PromotionRepository promotionRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    // ==================== SERVICES ====================

    @PostMapping("/services")
    public ResponseEntity<TourService> createService(@RequestBody TourService service) {
        if (service.getProviderId() != null) {
            userRepository.findById(service.getProviderId()).ifPresent(service::setProvider);
        }
        TourService saved = serviceRepository.save(service);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/services")
    public ResponseEntity<List<TourService>> getServicesByProvider(@RequestParam Long providerId) {
        return ResponseEntity.ok(serviceRepository.findByProvider_Id(providerId));
    }

    @GetMapping("/services/all")
    public ResponseEntity<List<TourService>> getAllServices() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<TourService> getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<TourService> updateService(@PathVariable Long id, @RequestBody TourService service) {
        return serviceRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(service.getTitle());
                    existing.setDescription(service.getDescription());
                    existing.setPrice(service.getPrice());
                    existing.setCapacity(service.getCapacity());
                    existing.setLocation(service.getLocation());
                    existing.setCategory(service.getCategory());
                    existing.setImageUrl(service.getImageUrl());
                    if (service.getProviderId() != null) {
                        userRepository.findById(service.getProviderId()).ifPresent(existing::setProvider);
                    }
                    return ResponseEntity.ok(serviceRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== BOOKINGS ====================

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getBookingsByProvider(@RequestParam Long providerId) {
        return ResponseEntity.ok(bookingRepository.findBookingsByProviderId(providerId));
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status
    ) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(status);
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Tourist creates a booking
    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getServiceId() != null) {
            serviceRepository.findById(booking.getServiceId()).ifPresent(booking::setService);
        }
        if (booking.getUserId() != null) {
            userRepository.findById(booking.getUserId()).ifPresent(booking::setUser);
        }
        booking.setStatus(BookingStatus.PENDING);
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    // ==================== PROMOTIONS ====================

    @PostMapping("/promotions")
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        if (promotion.getProviderId() != null) {
            userRepository.findById(promotion.getProviderId()).ifPresent(promotion::setProvider);
        }
        Promotion saved = promotionRepository.save(promotion);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/promotions")
    public ResponseEntity<List<Promotion>> getPromotionsByProvider(@RequestParam Long providerId) {
        return ResponseEntity.ok(promotionRepository.findByProvider_Id(providerId));
    }

    @DeleteMapping("/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== EVENTS ====================

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        event.setCurrentBookings(0);
        if (event.getProviderId() != null) {
            userRepository.findById(event.getProviderId()).ifPresent(event::setProvider);
        }
        Event saved = eventRepository.save(event);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByProvider(@RequestParam Long providerId) {
        return ResponseEntity.ok(eventRepository.findByProvider_Id(providerId));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(event.getTitle());
                    existing.setEventDate(event.getEventDate());
                    existing.setEventTime(event.getEventTime());
                    existing.setCapacity(event.getCapacity());
                    existing.setStatus(event.getStatus());
                    existing.setImageUrl(event.getImageUrl());
                    if (event.getProviderId() != null) {
                        userRepository.findById(event.getProviderId()).ifPresent(existing::setProvider);
                    }
                    return ResponseEntity.ok(eventRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
