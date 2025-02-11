package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressResponse;
import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductResponse;
import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressWorkout.DayProgressWorkoutRequest;
import com.example.JavaFitnessTracker.entity.*;
import com.example.JavaFitnessTracker.entity.enums.Gender;
import com.example.JavaFitnessTracker.exceptions.UnknownDayProgressException;
import com.example.JavaFitnessTracker.exceptions.UnknownProductException;
import com.example.JavaFitnessTracker.exceptions.UnknownUserException;
import com.example.JavaFitnessTracker.exceptions.UnknownWorkoutException;
import com.example.JavaFitnessTracker.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

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

    public DayProgressResponse getDayProgressInfo(Long userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(UnknownUserException::new);
        DayProgress dayProgress = dayProgressRepository.findByUserIdAndRecordingDate(userId, date)
                .orElseGet(() -> {
                    DayProgress newDayProgress = new DayProgress();
                    newDayProgress.setUser(user);
                    return newDayProgress;
                });
        Double dayNormCalories = calculateDayNormCalories(user);
        if (dayProgress.getDayProgressProducts() == null) {
            return DayProgressResponse.builder()
                    .dayNormCalories(calculateDayNormCalories(user))
                    .dayNormProteins(calculateDayNormParam(dayNormCalories, "proteins"))
                    .dayNormFats(calculateDayNormParam(dayNormCalories, "fats"))
                    .dayNormCarbohydrates(calculateDayNormParam(dayNormCalories, "carbohydrates"))
                    .build();
        }

        List<DayProgressProductResponse> dayProgressProductResponses = dayProgressProductRepository.getCaloriesAndGramsOfProduct(dayProgress.getId());
        return DayProgressResponse.builder()
                .dayNormCalories(dayNormCalories)
                .dayNormProteins(calculateDayNormParam(dayNormCalories, "proteins"))
                .dayNormFats(calculateDayNormParam(dayNormCalories, "fats"))
                .dayNormCarbohydrates(calculateDayNormParam(dayNormCalories, "carbohydrates"))
                .intakeCalories(calculateIntakeParam(dayProgressProductResponses, "calories"))
                .proteins(calculateIntakeParam(dayProgressProductResponses, "proteins"))
                .fats(calculateIntakeParam(dayProgressProductResponses, "fats"))
                .carbohydrates(calculateIntakeParam(dayProgressProductResponses, "carbohydrates"))
                .build();
    }

    private Double calculateDayNormCalories(User user) {
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
        double deltaCaloriesForPurpose = (
                switch (user.getPurpose()) {
                    case LOSE -> -200.0;
                    case MAINTAIN -> 0.0;
                    case GAIN -> 200.0;
                });
        return (user.getWeight() * 10.0 + user.getHeight() * 6.25 - age * 5.0 + delta) * coefActivity + deltaCaloriesForPurpose;
    }

    private double calculateDayNormParam(Double dayNormCalories, String item) {
        return switch (item) {
            case "proteins", "carbohydrates" -> (dayNormCalories * 0.4) / 4.0;
            case "fats" -> (dayNormCalories * 0.2) / 4.0;
            default -> throw new IllegalStateException("Unexpected value: " + item);
        };
    }

    private Double calculateIntakeParam(List<DayProgressProductResponse> responseList, String param) {
        Double sum = 0.0;
        switch (param) {
            case "proteins":
                for (DayProgressProductResponse dayProgressProductResponse : responseList) {
                    sum += dayProgressProductResponse.getGramsOfProduct() * dayProgressProductResponse.getProteins() / 100.0;
                }
                break;
            case "carbohydrates":
                for (DayProgressProductResponse dayProgressProductResponse : responseList) {
                    sum += dayProgressProductResponse.getGramsOfProduct() * dayProgressProductResponse.getCarbohydrates() / 100.0;
                }
                break;
            case "fats":
                for (DayProgressProductResponse dayProgressProductResponse : responseList) {
                    sum += dayProgressProductResponse.getGramsOfProduct() * dayProgressProductResponse.getFats() / 100.0;
                }
                break;
            case "calories":
                for (DayProgressProductResponse dayProgressProductResponse : responseList) {
                    sum += dayProgressProductResponse.getCalories();
                }
                break;
            default:
                return 0.0;
        }
        return sum;
    }

//    private Double calculateBurnedCalories(User user) {
//        Double sum = 0.0;
//        return sum;
//    }
}
