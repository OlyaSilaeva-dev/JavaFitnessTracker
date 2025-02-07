package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressProductRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressWorkoutRequest;
import com.example.JavaFitnessTracker.entity.*;
import com.example.JavaFitnessTracker.exceptions.UnknownProductException;
import com.example.JavaFitnessTracker.exceptions.UnknownUserException;
import com.example.JavaFitnessTracker.exceptions.UnknownWorkoutException;
import com.example.JavaFitnessTracker.repositories.*;
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
    private final WorkoutRepository workoutRepository;
    private final DayProgressWorkoutRepository dayProgressWorkoutRepository;

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

    public void addWorkoutToDayProgress(DayProgressWorkoutRequest request) {
        DayProgress dayProgress = dayProgressRepository.findByUserIdAndRecordingDate(request.getUserId(), LocalDate.now())
                .orElseGet(() -> {
                    DayProgress newDayProgress = new DayProgress();
                    newDayProgress.setUser(userRepository.findById(request.getUserId()).orElseThrow(UnknownUserException::new));
                    return newDayProgress;
                });
        Workout workout = workoutRepository.findById(request.getWorkoutId()).orElseThrow(UnknownWorkoutException::new);

        DayProgressWorkout dayProgressWorkout = DayProgressWorkout.builder()
                .workout(workout)
                .dayProgress(dayProgressRepository.save(dayProgress))
                .build();

        dayProgressWorkoutRepository.save(dayProgressWorkout);
    }
}
