package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/api/v1/exercises")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("")
    public String exercises(@RequestParam(name = "name", required = false) String name, Model model) {
        model.addAttribute("exercises", exerciseService.list(name));
        return "exercise";
    }

    @GetMapping("/{id}")
    public String productInfo(@PathVariable Long id, Model model) {
        model.addAttribute("exercise", exerciseService.getExerciseById(id));
        return "exercise-info";
    }

    @PostMapping("/{id}/upload")
    public String productUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        exerciseService.save(exerciseService.getExerciseById(id), file);
        return "redirect:/exercise";
    }

    @PostMapping("/create")
    public ResponseEntity<String> createExercise(@RequestParam("file") MultipartFile file, Exercise exercise) throws IOException {
        exerciseService.save(exercise, file);
        return ResponseEntity.ok("Exercise created");
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.ok("Exercise deleted");
    }
}
