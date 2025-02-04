package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
    List<WorkoutExercise> findByWorkoutId(Long id);
}
