package com.example.JavaFitnessTracker.dto.product;


import com.example.JavaFitnessTracker.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbohydrates;
    private Long imageId;

    public ProductResponse(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.calories = product.getCalories();
        this.proteins = product.getProteins();
        this.fats = product.getFats();
        this.carbohydrates = product.getCarbohydrates();
        this.imageId = product.getImage().getId();
    }
}
