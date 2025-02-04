package com.example.JavaFitnessTracker.dto.exercise;

import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.entity.enums.Intensity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseResponse {
    private Long id;
    private String name;
    private Intensity intensity;
    private Double calories;
    private Long ImageId;

    public ExerciseResponse(Exercise exercise) {
        this.id = exercise.getId();
        this.name = exercise.getName();
        this.intensity = exercise.getIntensity();
        this.calories = exercise.getCalories();
        this.ImageId = exercise.getImage().getId();
    }
}
