package com.example.JavaFitnessTracker.exceptions;

public class UnknownUserException extends RuntimeException {
    public UnknownUserException(String message) {
        super(message);
    }

    public UnknownUserException() {
        this("Пользователь не найден");
    }
}
