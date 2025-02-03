package com.example.JavaFitnessTracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "dayprogress")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DayProgress {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "recording_date", nullable = false)
    private LocalDate recordingDate;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "dayProgress", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<DayProgressProduct> dayProgressProducts;

    @OneToMany(mappedBy = "dayProgress", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<DayProgressWorkout> dayProgressWorkouts;

    @PrePersist
    protected void onCreate() {
        recordingDate = LocalDate.now();
    }
}
