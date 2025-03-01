package com.example.JavaFitnessTracker.entity;


import com.example.JavaFitnessTracker.entity.enums.Meal;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
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
}
