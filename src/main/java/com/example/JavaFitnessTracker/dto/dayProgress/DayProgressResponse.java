package com.example.JavaFitnessTracker.dto.dayProgress;

import com.example.JavaFitnessTracker.entity.DayProgress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressResponse {
    private Double intakeCalories;
    private Double burnedCalories;
    private Double fats;
    private Double proteins;
    private Double carbohydrates;

    private Double dayNormCalories;
    private Double dayNormFats;
    private Double dayNormProteins;
    private Double dayNormCarbohydrates;
}
