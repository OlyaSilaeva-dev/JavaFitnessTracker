package com.example.JavaFitnessTracker.exceptions;

public class UnknownExerciseException extends RuntimeException {
    public UnknownExerciseException(String message) {
        super(message);
    }

    public UnknownExerciseException() { this("Упражнение не найдено!"); }
}
