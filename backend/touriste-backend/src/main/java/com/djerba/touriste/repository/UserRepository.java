package com.djerba.touriste.repository;

import com.djerba.touriste.model.User;
import com.djerba.touriste.model.Role;
import com.djerba.touriste.model.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(Role role);
    long countByStatus(UserStatus status);
}
