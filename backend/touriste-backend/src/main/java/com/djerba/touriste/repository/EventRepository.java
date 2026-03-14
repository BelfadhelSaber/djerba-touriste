package com.djerba.touriste.repository;

import com.djerba.touriste.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByProvider_Id(Long providerId);
}
