package com.example.JavaFitnessTracker.controllers;

import com.example.JavaFitnessTracker.dto.auth.RegisterRequest;
import com.example.JavaFitnessTracker.entity.Logs;
import com.example.JavaFitnessTracker.entity.User;
import com.example.JavaFitnessTracker.services.LogsService;
import com.example.JavaFitnessTracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin")
@CrossOrigin
public class AdminController {

    private final UserService userService;
    private final LogsService logsService;

    @GetMapping("user/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @PatchMapping("user/make_admin")
    public ResponseEntity<Boolean> makeAdmin(@RequestParam Long userId) {
        return ResponseEntity.ok(userService.makeAdmin(userId));
    }

    @PatchMapping("user/make_user")
    public ResponseEntity<Boolean> makeUser(@RequestParam Long userId) {
        return ResponseEntity.ok(userService.makeUser(userId));
    }

    @GetMapping("logs/page")
    public ResponseEntity<Page<Logs>> getAllLogs(@RequestParam Integer offset, @RequestParam Integer limit) {
        return ResponseEntity.ok(logsService.findAll(PageRequest.of(offset, limit, Sort.by("timestamp").descending())));
    }

}
