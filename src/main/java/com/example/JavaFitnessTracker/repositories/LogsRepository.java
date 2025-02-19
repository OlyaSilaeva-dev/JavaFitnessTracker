package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.Logs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogsRepository extends JpaRepository<Logs, Long> {
}
