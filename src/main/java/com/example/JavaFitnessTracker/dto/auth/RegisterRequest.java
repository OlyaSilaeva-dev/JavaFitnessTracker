package com.example.JavaFitnessTracker.dto.auth;

import com.example.JavaFitnessTracker.entity.enums.Activity;
import com.example.JavaFitnessTracker.entity.enums.Gender;
import com.example.JavaFitnessTracker.entity.enums.Purpose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private Integer birthYear;
    private Double weight;
    private Double height;
    private Gender gender;
    private Activity activity;
    private Purpose purpose;
}
