package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.auth.AuthenticationRequest;
import com.example.JavaFitnessTracker.dto.auth.AuthenticationResponse;
import com.example.JavaFitnessTracker.dto.auth.RegisterRequest;
import com.example.JavaFitnessTracker.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestPart RegisterRequest request,
            @RequestParam MultipartFile avatar
    ) throws IOException {
        return ResponseEntity.ok(service.register(request, avatar));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authentication(request));
    }
}

