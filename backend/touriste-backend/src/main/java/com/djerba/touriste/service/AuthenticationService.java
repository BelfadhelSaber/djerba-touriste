package com.djerba.touriste.service;

import com.djerba.touriste.config.JwtService;
import com.djerba.touriste.dto.AuthenticationRequest;
import com.djerba.touriste.dto.AuthenticationResponse;
import com.djerba.touriste.dto.RegisterRequest;
import com.djerba.touriste.model.Role;
import com.djerba.touriste.model.User;
import com.djerba.touriste.model.UserStatus;
import com.djerba.touriste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Role userRole = request.getRole() != null ? request.getRole() : Role.TOURIST;
        // Providers must be approved by admin before they can log in
        UserStatus userStatus = (userRole == Role.PROVIDER) ? UserStatus.PENDING : UserStatus.ACTIVE;

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .status(userStatus)
                .build();
                
        repository.save(user);
        
        // Return the status so the frontend can redirect to a "pending approval" page
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                // For PENDING accounts, we don't issue a token — no dashboard access
                .token(userStatus == UserStatus.ACTIVE ? jwtService.generateToken(user) : null)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("Account is not active. Status: " + user.getStatus());
        }
                
        var jwtToken = jwtService.generateToken(user);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }
}
