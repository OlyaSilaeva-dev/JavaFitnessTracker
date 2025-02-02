package com.example.JavaFitnessTracker.dto.dayProgress;

import com.example.JavaFitnessTracker.entity.enums.Meal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayProgressProductRequest {
    private Long userId;
    private Long productId;
    private Double gramsOfProduct;
    private Meal meal;
}
