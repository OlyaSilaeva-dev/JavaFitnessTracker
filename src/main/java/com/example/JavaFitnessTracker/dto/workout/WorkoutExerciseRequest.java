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
    private Long exerciseId;
    private Long workoutId;
    private Long interval;
}
