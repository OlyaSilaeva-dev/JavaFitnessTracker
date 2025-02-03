package com.example.JavaFitnessTracker.exceptions;

public class UnknownWorkoutException extends RuntimeException {
    public UnknownWorkoutException(String message) {
        super(message);
    }

    public UnknownWorkoutException() { this("Тренировка не найдена!"); }
}
