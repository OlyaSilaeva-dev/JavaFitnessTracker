package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.auth.AuthenticationRequest;
import com.example.JavaFitnessTracker.dto.auth.AuthenticationResponse;
import com.example.JavaFitnessTracker.dto.auth.RegisterRequest;
import com.example.JavaFitnessTracker.entity.Image;
import com.example.JavaFitnessTracker.entity.User;
import com.example.JavaFitnessTracker.entity.enums.Role;
import com.example.JavaFitnessTracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


//    private String email;
//    private String password;
//    private String name;
//    private Double weight;
//    private Double height;
//    private Gender gender;
//    private Purpose purpose;

    public AuthenticationResponse register(RegisterRequest request, MultipartFile file) throws IOException {
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .weight(request.getWeight())
                .height(request.getHeight())
                .gender(request.getGender())
                .purpose(request.getPurpose())
                .avatar(file.isEmpty() ? null: toImageEntity(file))
                .role(Role.USER)
        .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(Map.of("role",user.getRole()) , user);
        return new AuthenticationResponse(jwtToken);
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return null;
        }
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setOriginalFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public AuthenticationResponse authentication(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(Map.of("role", user.getRole()), user);
        return new AuthenticationResponse(jwtToken);
    }
}
