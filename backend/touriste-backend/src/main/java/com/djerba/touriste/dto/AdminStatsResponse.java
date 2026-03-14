package com.djerba.touriste.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {
    private long totalUsers;
    private long activeUsers;
    private long providerUsers;
    private long touristUsers;
    private long bannedUsers;
    private long pendingUsers;
    private double globalRevenue; // Placeholder for now
}
