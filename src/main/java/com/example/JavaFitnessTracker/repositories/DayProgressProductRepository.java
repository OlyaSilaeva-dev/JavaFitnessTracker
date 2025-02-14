package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductResponse;
import com.example.JavaFitnessTracker.entity.DayProgressProduct;
import com.example.JavaFitnessTracker.entity.enums.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayProgressProductRepository extends JpaRepository<DayProgressProduct, Long> {

    @Query(value = "select p.calories, p.proteins, p.fats, p.carbohydrates, dp.grams_of_product " +
            "from dayprogress_product dp " +
            "join product p ON p.id = dp.product_id " +
            "where dp.dayprogress_id = :dayprogressId", nativeQuery = true)
    List<DayProgressProductResponse> getCaloriesAndGramsOfProduct(@Param("dayprogressId")Long dayprogressId);


    @Query(value = "select p.calories, p.proteins, p.fats, p.carbohydrates, dp.grams_of_product " +
            "from dayprogress_product dp " +
            "join product p ON p.id = dp.product_id " +
            "where dp.dayprogress_id = :dayprogressId and dp.meal = :meal", nativeQuery = true)
    List<DayProgressProductResponse> getProductInfoByDayAndMeal(@Param("dayprogressId")Long dayprogressId, @Param("meal")Meal meal);
}
