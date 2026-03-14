package com.djerba.touriste.controller;

import com.djerba.touriste.dto.AdminStatsResponse;
import com.djerba.touriste.model.Role;
import com.djerba.touriste.model.UserStatus;
import com.djerba.touriste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        AdminStatsResponse stats = AdminStatsResponse.builder()
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.countByStatus(UserStatus.ACTIVE))
                .bannedUsers(userRepository.countByStatus(UserStatus.BANNED))
                .pendingUsers(userRepository.countByStatus(UserStatus.PENDING))
                .providerUsers(userRepository.countByRole(Role.PROVIDER))
                .touristUsers(userRepository.countByRole(Role.TOURIST))
                .globalRevenue(428190.0) // Mock value for now as specified in the UI
                .build();
        return ResponseEntity.ok(stats);
    }
}
