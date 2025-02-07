package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressProductRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressResponse;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressWorkoutRequest;
import com.example.JavaFitnessTracker.entity.*;
import com.example.JavaFitnessTracker.entity.enums.Gender;
import com.example.JavaFitnessTracker.exceptions.UnknownDayProgressException;
import com.example.JavaFitnessTracker.exceptions.UnknownProductException;
import com.example.JavaFitnessTracker.exceptions.UnknownUserException;
import com.example.JavaFitnessTracker.exceptions.UnknownWorkoutException;
import com.example.JavaFitnessTracker.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.type.descriptor.sql.internal.Scale6IntervalSecondDdlType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;

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

    public DayProgressResponse getDayProgressInfo(DayProgressRequest request) {
        DayProgress dayProgress = dayProgressRepository.findByUserIdAndRecordingDate(request.getUserId(), request.getDay())
                .orElseThrow(UnknownDayProgressException::new);

        DayProgressResponse dayProgressResponse = DayProgressResponse.builder()
                .dayNormCalories(calculateDayNormCalories(request.getUserId()))
                .build();

        return dayProgressResponse;
    }

    private Double calculateDayNormCalories(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UnknownUserException::new);

        double coefActivity = (
                switch (user.getActivity()) {
                    case LOWEST -> 1.2;
                    case LOW -> 1.38;
                    case MEDIUM -> 1.55;
                    case HIGHEST -> 1.73;
                    case HIGH -> 1.9;
                });

        double delta = (user.getGender() == Gender.MALE ? 5.0 : -161.0);
        double age = Year.now().getValue() - user.getBirthYear();
        return (user.getWeight() + user.getHeight() - age * 5 + delta) * coefActivity;
    }
}
