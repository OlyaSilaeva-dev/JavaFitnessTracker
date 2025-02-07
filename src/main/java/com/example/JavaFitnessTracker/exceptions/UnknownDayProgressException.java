package com.example.JavaFitnessTracker.exceptions;

public class UnknownDayProgressException extends RuntimeException {
    public UnknownDayProgressException(String message) {
        super(message);
    }

    public UnknownDayProgressException() { this("записи на этот день не найдены!"); }
}
