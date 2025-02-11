package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.DayProgressWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayProgressWorkoutRepository extends JpaRepository<DayProgressWorkout, Long> {
    List<DayProgressWorkout> findByDayProgressId(Long id);
}
