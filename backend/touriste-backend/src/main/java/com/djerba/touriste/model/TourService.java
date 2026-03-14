package com.djerba.touriste.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "services")
public class TourService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String imageUrl;
    
    @Column(columnDefinition = "TEXT")
    private String images;
    
    @Column(length = 1000)
    private String description;
    
    private Double price;
    private Integer capacity;
    private String location;
    private String category;
    private Double averageRating;
    
    // --- Type Specific Fields ---
    
    // Identifies the generic type (ROOM, MENU, TABLE, GUIDE_TOUR, EVENT)
    private String serviceType;
    
    // Hotel / Hébergement specific
    private String roomView;
    private String boardType; // Primary/Default board type
    
    @Column(columnDefinition = "TEXT")
    private String boardPrices; // JSON mapping: {"Logement Simple": 100, "Demi Pension": 150}
    
    // Restaurant / Cafe specific
    @Column(length = 2000)
    private String menuDetails;
    
    // Guide & Event specific
    private String duration;

    @Transient
    private Long providerId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User provider;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean available = true;
}
