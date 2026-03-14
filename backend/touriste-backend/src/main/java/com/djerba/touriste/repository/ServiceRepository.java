package com.djerba.touriste.repository;

import com.djerba.touriste.model.TourService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<TourService, Long> {
    List<TourService> findByProvider_Id(Long providerId);
}
