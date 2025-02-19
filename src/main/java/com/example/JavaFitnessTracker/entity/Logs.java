package com.example.JavaFitnessTracker.entity;

import com.example.JavaFitnessTracker.entity.enums.Operation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Logs {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name = "table_name")
    String tableName;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    Operation operation;

    @Column(name = "record_id")
    Long recordId;

    @Column(name = "timestamp")
    LocalDateTime timestamp;

    @Column(name = "old_data", columnDefinition = "jsonb")
    String oldData;

    @Column(name = "new_data",columnDefinition = "jsonb")
    String newData;
}
