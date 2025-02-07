package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.workout.WorkoutExerciseRequest;
import com.example.JavaFitnessTracker.dto.workout.WorkoutRequest;
import com.example.JavaFitnessTracker.entity.Workout;
import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.entity.WorkoutExercise;
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
    private final WorkoutService workoutService;

    @GetMapping("/all")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.listWorkout());
    }

    @PostMapping("/create")
    public ResponseEntity<Workout> createWorkout(@RequestBody WorkoutRequest workoutRequest) {
        return ResponseEntity.ok(workoutService.createEmptyWorkout(workoutRequest));
    }

    @PostMapping("/add_exercise")
    public ResponseEntity<String> addExercise(@RequestBody WorkoutExerciseRequest request) {
        workoutService.AddExerciseToWorkout(request);
        return ResponseEntity.ok("add exercise to workout");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }

    @GetMapping("/find_exercises/{id}")
    public ResponseEntity<List<WorkoutExercise>> getWorkoutExercises(@PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutExercisesByWorkoutId(id));
    }
}
