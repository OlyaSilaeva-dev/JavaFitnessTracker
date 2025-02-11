package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductResponse;
import com.example.JavaFitnessTracker.entity.DayProgressProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayProgressProductRepository extends JpaRepository<DayProgressProduct, Long> {

    @Query(value = "select calories, proteins, fats, carbohydrates, grams_of_product " +
            "from dayprogress_product, product " +
            "where product.id = dayprogress_product.product_id and dayprogress_product.dayprogress_id = :dayprogressId", nativeQuery = true)
    List<DayProgressProductResponse> getCaloriesAndGramsOfProduct(@Param("dayprogressId")Long dayprogressId);
}
