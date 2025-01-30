package com.example.JavaFitnessTracker.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainPageController {

    @GetMapping("/api/v1")
    public String mainPage() {
        return "main-page";
    }
}
