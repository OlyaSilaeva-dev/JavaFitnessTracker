package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.entity.DayProgress;
import com.example.JavaFitnessTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DayProgressRepository  extends JpaRepository<DayProgress, Long> {
    Optional<DayProgress> findByUser(User user);

    Optional<DayProgress> findByUserIdAndRecordingDate(Long userId, LocalDate RecordingDate);
}
