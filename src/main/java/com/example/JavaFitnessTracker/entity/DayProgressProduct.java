package com.example.JavaFitnessTracker.entity;


import com.example.JavaFitnessTracker.entity.enums.Meal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Table(name = "dayprogress_product")
@AllArgsConstructor
@NoArgsConstructor
public class DayProgressProduct {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "grams_of_product")
    private Double gramsOfProduct;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal")
    private Meal meal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dayprogress_id", nullable = false)
    private DayProgress dayProgress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getGramsOfProduct() {
        return gramsOfProduct;
    }

    public void setGramsOfProduct(Double gramsOfProduct) {
        this.gramsOfProduct = gramsOfProduct;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public DayProgress getDayProgress() {
        return dayProgress;
    }

    public void setDayProgress(DayProgress dayProgress) {
        this.dayProgress = dayProgress;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
