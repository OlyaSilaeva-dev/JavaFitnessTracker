package com.example.JavaFitnessTracker.dto.workout;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutExerciseRequest {
    private Long workoutId;
    private Long exerciseId;
    private Long interval;
}
