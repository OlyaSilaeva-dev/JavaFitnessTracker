package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.exercise.ExerciseRequest;
import com.example.JavaFitnessTracker.dto.exercise.ExerciseResponse;
import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/api/v1/pages/exercises")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("/all")
    public ResponseEntity<List<ExerciseResponse>> exercises(@RequestParam(name = "name", required = false) String name) {
        return ResponseEntity.ok(exerciseService.list(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponse> exerciseInfo(@PathVariable Long id) {
        return ResponseEntity.ok(new ExerciseResponse(exerciseService.getExerciseById(id)));
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadExercise(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        Exercise exercise = exerciseService.getExerciseById(id);
        ExerciseRequest exerciseRequest = ExerciseRequest.builder()
                .intensity(exercise.getIntensity())
                .name(exercise.getName())
                .calories(exercise.getCalories())
                .build();

        exerciseService.save(exerciseRequest, file);
        return ResponseEntity.ok("Successfully uploaded file");
    }

    @PostMapping("/create")
    public ResponseEntity<String> createExercise(@RequestPart ExerciseRequest request, @RequestParam MultipartFile image) throws IOException {
        exerciseService.save(request, image);
        return ResponseEntity.ok("Exercise created");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.ok("Exercise deleted");
    }
}
