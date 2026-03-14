package com.djerba.touriste.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String imageUrl;
    
    private LocalDate eventDate;
    
    private LocalTime eventTime;
    
    private Integer capacity;
    
    private Integer currentBookings;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    @Transient
    private Long providerId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User provider;
}
