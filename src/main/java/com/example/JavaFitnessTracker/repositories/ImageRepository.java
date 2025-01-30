package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
