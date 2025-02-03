package com.example.JavaFitnessTracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Table(name = "dayprogress_workout")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DayProgressWorkout {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dayprogress_id", nullable = false)
    private DayProgress dayProgress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;
}