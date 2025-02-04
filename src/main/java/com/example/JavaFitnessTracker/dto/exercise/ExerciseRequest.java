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
public class ExerciseRequest {
    private String name;
    private Intensity intensity;
    private Double calories;
}
