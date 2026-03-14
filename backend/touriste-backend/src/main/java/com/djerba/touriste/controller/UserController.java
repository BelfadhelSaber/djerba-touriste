package com.djerba.touriste.controller;

import com.djerba.touriste.model.User;
import com.djerba.touriste.model.UserStatus;
import com.djerba.touriste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody User userUpdates) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // We only allow updating profile fields, not credentials or roles here
                    if (userUpdates.getFirstName() != null) existingUser.setFirstName(userUpdates.getFirstName());
                    if (userUpdates.getLastName() != null) existingUser.setLastName(userUpdates.getLastName());
                    
                    // Provider fields
                    existingUser.setBusinessName(userUpdates.getBusinessName());
                    existingUser.setType(userUpdates.getType());
                    existingUser.setBio(userUpdates.getBio());
                    existingUser.setAddress(userUpdates.getAddress());
                    existingUser.setPhone(userUpdates.getPhone());
                    existingUser.setWebsite(userUpdates.getWebsite());
                    existingUser.setFacebook(userUpdates.getFacebook());
                    existingUser.setInstagram(userUpdates.getInstagram());
                    existingUser.setLanguages(userUpdates.getLanguages());

                    User savedUser = userRepository.save(existingUser);
                    return ResponseEntity.ok(savedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(@PathVariable Long id, @RequestParam UserStatus status) {
        System.out.println("Updating status for user " + id + " to " + status);
        return userRepository.findById(id)
                .map(user -> {
                    user.setStatus(status);
                    User savedUser = userRepository.save(user);
                    System.out.println("User status updated successfully");
                    return ResponseEntity.ok(savedUser);
                })
                .orElseGet(() -> {
                    System.out.println("User not found with id: " + id);
                    return ResponseEntity.notFound().build();
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
