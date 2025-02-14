package com.example.JavaFitnessTracker.dto.dayProgress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressMealsResponse {
    private Double breakfastCalories;
    private Double breakfastFats;
    private Double breakfastProteins;
    private Double breakfastCarbohydrates;

    private Double lunchCalories;
    private Double lunchFats;
    private Double lunchProteins;
    private Double lunchCarbohydrates;

    private Double dinnerCalories;
    private Double dinnerFats;
    private Double dinnerProteins;
    private Double dinnerCarbohydrates;
}
