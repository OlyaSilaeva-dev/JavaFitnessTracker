package com.example.JavaFitnessTracker.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    private String name;
    private String calories;
    private String proteins;
    private String fats;
    private String carbohydrates;
}
