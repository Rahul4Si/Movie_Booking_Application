package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ShowResponse {
    private Long id;
    private String title;
    private String description;
    private List<String> genre;
    private String duration;
    private String releaseDate;
    private String showDateTime;
    private double price;
    private String imageUrl;
    private double rating;
}
