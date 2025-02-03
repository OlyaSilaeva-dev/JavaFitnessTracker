package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.workout.WorkoutExerciseRequest;
import com.example.JavaFitnessTracker.entity.Workout;
import com.example.JavaFitnessTracker.services.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/pages/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    WorkoutService workoutService;

    @GetMapping("/all")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.listWorkout());
    }

    @PostMapping("/create")
    public ResponseEntity<Workout> createWorkout(@RequestBody String name) {
        return ResponseEntity.ok(workoutService.createEmptyWorkout(name));
    }

    @PostMapping("/add_exercise")
    public ResponseEntity<Workout> addExercise(@RequestBody WorkoutExerciseRequest request) {
        return ResponseEntity.ok(workoutService.AddExerciseToWorkout(request));
    }
}
