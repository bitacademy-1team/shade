package com.one.shade.repository;

import com.one.shade.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByNickname(String nickname);
    Optional<User> findByEmail(String email);
    Boolean existsByEmailAndUsername(String email,String username);
    Optional<User> findByUsernameAndEmail(String username, String email);
}
