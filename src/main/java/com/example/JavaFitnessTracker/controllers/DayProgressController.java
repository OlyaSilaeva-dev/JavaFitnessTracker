package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressResponse;
import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductRequest;
import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressProduct.DayProgressProductResponse;
import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressWorkout.DayProgressWorkoutRequest;
import com.example.JavaFitnessTracker.services.DayProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
@RequestMapping("/api/v1/day_progress")
@RequiredArgsConstructor
public class DayProgressController {
    private final DayProgressService dayProgressService;

    @PostMapping("/add_product")
    public ResponseEntity<String> createDayProgressProduct(@RequestBody DayProgressProductRequest dayProgressProductRequest) {
        dayProgressService.addProductToDayProgress(dayProgressProductRequest);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add_workout")
    public ResponseEntity<String> createDayProgressWorkout(@RequestBody DayProgressWorkoutRequest dayProgressWorkoutRequest) {
        dayProgressService.addWorkoutToDayProgress(dayProgressWorkoutRequest);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/info")
    public ResponseEntity<DayProgressResponse> getDayProgressInfo(@RequestParam Long userId, @RequestParam LocalDate date) {
        return ResponseEntity.ok(dayProgressService.getDayProgressInfo(userId, date));
    }
}
