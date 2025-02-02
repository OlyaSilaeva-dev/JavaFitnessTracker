package com.example.JavaFitnessTracker.exceptions;

public class UnknownProductException extends RuntimeException {
    public UnknownProductException(String message) {
        super(message);
    }

    public UnknownProductException() { this("Продукт не найден!"); }
}
