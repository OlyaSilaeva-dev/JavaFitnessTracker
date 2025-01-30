package com.example.JavaFitnessTracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "image")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name="bytes")
    private byte[] bytes;

    @Column(name = "name")
    private String name;

    @Column(name = "original_filename")
    private String originalFilename;

    @Column(name = "size")
    private Long size;

    @Column(name = "content_type")
    private String contentType;

}
