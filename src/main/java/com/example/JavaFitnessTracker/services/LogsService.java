package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.entity.Logs;
import com.example.JavaFitnessTracker.repositories.LogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogsService {
    private final LogsRepository logsRepository;

    public Page<Logs> findAll(Pageable pageable) {
        return logsRepository.findAll(pageable);
    }
}
