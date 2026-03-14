package com.djerba.touriste.controller;

import com.djerba.touriste.model.TourService;
import com.djerba.touriste.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ServiceRepository serviceRepository;

    @GetMapping("/services")
    public ResponseEntity<List<TourService>> getAllServices() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }
    
    @GetMapping("/services/category/{category}")
    public ResponseEntity<List<TourService>> getServicesByCategory(@PathVariable String category) {
        // Find by category ignoring case, or filter in memory if the repository doesn't have a specific finder yet.
        List<TourService> allServices = serviceRepository.findAll();
        List<TourService> filtered = allServices.stream()
            .filter(s -> category.equalsIgnoreCase(s.getCategory()))
            .toList();
            
        return ResponseEntity.ok(filtered);
    }
    
    @GetMapping("/services/type/{serviceType}")
    public ResponseEntity<List<TourService>> getServicesByType(@PathVariable String serviceType) {
        List<TourService> allServices = serviceRepository.findAll();
        List<TourService> filtered = allServices.stream()
            .filter(s -> serviceType.equalsIgnoreCase(s.getServiceType()))
            .toList();
            
        return ResponseEntity.ok(filtered);
    }
}
