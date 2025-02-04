package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.Workout;
import com.example.JavaFitnessTracker.entity.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
