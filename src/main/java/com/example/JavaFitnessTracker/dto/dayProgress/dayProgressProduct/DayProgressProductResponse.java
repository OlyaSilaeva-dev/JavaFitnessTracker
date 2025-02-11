package com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressProductResponse {
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbohydrates;
    private Double gramsOfProduct;
}
