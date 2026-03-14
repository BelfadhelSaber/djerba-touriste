package com.djerba.touriste.repository;

import com.djerba.touriste.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByProvider_Id(Long providerId);
}
