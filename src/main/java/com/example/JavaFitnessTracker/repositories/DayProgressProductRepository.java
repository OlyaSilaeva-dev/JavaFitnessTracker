package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.DayProgressProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayProgressProductRepository extends JpaRepository<DayProgressProduct, Long> {
}
