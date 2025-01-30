package com.example.JavaFitnessTracker.dataSource;

public class DataSourceContextHolder {
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();

    public static void remove() { contextHolder.remove(); }

    public static void setContextHolder(String context) { contextHolder.set(context); }

    public static String getContextHolder() { return contextHolder.get(); }
}
