package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.workout.WorkoutExerciseRequest;
import com.example.JavaFitnessTracker.dto.workout.WorkoutRequest;
import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.entity.Workout;
import com.example.JavaFitnessTracker.entity.WorkoutExercise;
import com.example.JavaFitnessTracker.exceptions.UnknownExerciseException;
import com.example.JavaFitnessTracker.exceptions.UnknownWorkoutException;
import com.example.JavaFitnessTracker.repositories.ExerciseRepository;
import com.example.JavaFitnessTracker.repositories.WorkoutExerciseRepository;
import com.example.JavaFitnessTracker.repositories.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;

    public List<Workout> listWorkout() {
        return workoutRepository.findAll();
    }

    public Workout getWorkoutById(Long id) {
        return workoutRepository.findById(id).orElse(null);
    }

    public Workout createEmptyWorkout(WorkoutRequest workoutRequest) {
        Workout workout = Workout.builder()
                .name(workoutRequest.getWorkoutName())
                .build();
        return workoutRepository.save(workout);
    }

    public void AddExerciseToWorkout(WorkoutExerciseRequest request) {
        Workout workout = workoutRepository.findById(request.getWorkoutId()).orElseThrow(UnknownWorkoutException::new);
        WorkoutExercise workoutExercise = WorkoutExercise.builder()
                .workout(workout)
                .exercise(exerciseRepository.findById(request.getExerciseId()).orElseThrow(UnknownExerciseException::new))
                .interval(request.getInterval())
                .build();

        workoutExerciseRepository.save(workoutExercise);
    }

    public List<WorkoutExercise> getWorkoutExercisesByWorkoutId(Long workoutId) {
        return workoutExerciseRepository.findByWorkoutId(workoutId);
    }
}
