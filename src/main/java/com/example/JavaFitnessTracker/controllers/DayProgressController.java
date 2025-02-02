package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.dayProgress.DayProgressProductRequest;
import com.example.JavaFitnessTracker.services.DayProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

}
