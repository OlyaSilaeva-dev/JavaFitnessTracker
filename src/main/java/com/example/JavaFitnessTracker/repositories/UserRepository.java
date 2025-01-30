package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    Optional<User> findByEmail(String email);

    @Transactional
    Optional<User> findByName(String name);

    @Transactional
    @Modifying
    @Query(value = "update user_data set role = 'ADMIN' where id = ?1", nativeQuery = true)
    void changeToAdmin(Long userId);

    @Transactional
    @Modifying
    @Query(value = "update user_data set role = 'USER' where id = ?1", nativeQuery = true)
    void changeToUser(Long userId);


}
