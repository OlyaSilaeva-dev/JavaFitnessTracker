package com.example.JavaFitnessTracker.dto.dayProgress;

import com.example.JavaFitnessTracker.entity.DayProgress;
import com.example.JavaFitnessTracker.entity.DayProgressProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.Set;
import java.util.function.Function;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressProductResponse {
    private Double sumCalories;
    private Double sumProteins;
    private Double sumFats;
    private Double sumCarbohydrates;
}
