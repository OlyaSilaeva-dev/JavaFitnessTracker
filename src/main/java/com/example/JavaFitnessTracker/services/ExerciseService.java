package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.dto.exercise.ExerciseRequest;
import com.example.JavaFitnessTracker.dto.exercise.ExerciseResponse;
import com.example.JavaFitnessTracker.dto.product.ProductRequest;
import com.example.JavaFitnessTracker.dto.product.ProductResponse;
import com.example.JavaFitnessTracker.entity.Exercise;
import com.example.JavaFitnessTracker.entity.Image;
import com.example.JavaFitnessTracker.entity.Product;
import com.example.JavaFitnessTracker.repositories.ExerciseRepository;
import com.example.JavaFitnessTracker.repositories.ImageRepository;
import com.example.JavaFitnessTracker.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ImageRepository imageRepository;

    @Transactional
    public List<ExerciseResponse> list(String name) {
        List<Exercise> exercises = (name != null) ? exerciseRepository.findByName(name) : exerciseRepository.findAll();
        return exercises.stream().map(this::convertToProductResponse).collect(Collectors.toList());
    }

    private ExerciseResponse convertToProductResponse(Exercise exercise) {
        return ExerciseResponse.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .calories(exercise.getCalories())
                .intensity(exercise.getIntensity())
                .ImageId(exercise.getImage().getId())
                .build();
    }

    public void save(ExerciseRequest request, MultipartFile file) throws IOException {
        Image image;
        Exercise exercise = Exercise.builder()
                .name(request.getName())
                .calories(request.getCalories())
                .intensity(request.getIntensity())
                .build();

        if (file.getSize() != 0) {
            image = toImageEntity(file);
            imageRepository.save(image);
            exercise.setImage(image);
        }
        exerciseRepository.save(exercise);
        log.info("Saving new product. Name:{}", exercise.getName());
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setOriginalFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public void deleteExercise(Long id) {
        log.info("Deleting product {}", id);
        exerciseRepository.deleteById(id);
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElse(null);
    }}
