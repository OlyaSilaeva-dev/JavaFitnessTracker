package com.example.JavaFitnessTracker.repositories;

import com.example.JavaFitnessTracker.dto.dayProgress.dayProgressWorkout.DayProgressWorkoutResponse;
import com.example.JavaFitnessTracker.entity.DayProgressWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayProgressWorkoutRepository extends JpaRepository<DayProgressWorkout, Long> {
    List<DayProgressWorkout> findByDayProgressId(Long id);

    @Query(value = "SELECT e.calories, we.interval FROM workout_exercise we " +
            "JOIN exercise e ON we.exercise_id = e.id " +
            "JOIN workout w ON we.workout_id = w.id " +
            "JOIN dayprogress_workout dpw ON dpw.workout_id = w.id " +
            "WHERE dpw.dayprogress_id = :dayprogressId", nativeQuery = true)
    List<DayProgressWorkoutResponse> getExercisesAndIntervals(@Param("dayprogressId")Long dayprogressId);
}
