package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressProductRequest;
import com.example.JavaFitnessTracker.entity.DayProgress;
import com.example.JavaFitnessTracker.entity.DayProgressProduct;
import com.example.JavaFitnessTracker.entity.Product;
import com.example.JavaFitnessTracker.exceptions.UnknownProductException;
import com.example.JavaFitnessTracker.exceptions.UnknownUserException;
import com.example.JavaFitnessTracker.repositories.DayProgressProductRepository;
import com.example.JavaFitnessTracker.repositories.DayProgressRepository;
import com.example.JavaFitnessTracker.repositories.ProductRepository;
import com.example.JavaFitnessTracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Slf4j
@RequiredArgsConstructor
public class DayProgressService {
    private final DayProgressProductRepository dayProgressProductRepository;
    private final DayProgressRepository dayProgressRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void addProductToDayProgress(DayProgressProductRequest request) {
        DayProgress dayProgress = dayProgressRepository.findByUserIdAndRecordingDate(request.getUserId(), LocalDate.now())
                .orElseGet(() -> {
                    DayProgress newDayProgress = new DayProgress();
                    newDayProgress.setUser(userRepository.findById(request.getUserId()).orElseThrow(UnknownUserException::new));
                    return newDayProgress;
                });

        Product product = productRepository.findById(request.getProductId()).orElseThrow(UnknownProductException::new);

        DayProgressProduct dayProgressProduct = DayProgressProduct.builder()
                .product(product)
                .dayProgress(dayProgressRepository.save(dayProgress))
                .gramsOfProduct(request.getGramsOfProduct())
                .meal(request.getMeal())
                .build();

        dayProgressProductRepository.save(dayProgressProduct);
    }


}
