package com.example.JavaFitnessTracker.dto.dayProgress.dayProgressWorkout;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressWorkoutRequest {
    private long userId;
    private long workoutId;
}
