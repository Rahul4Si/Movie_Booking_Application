package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {
    private String title;
    private String description;
    private List<String> genre;
    private List<String> cast;
    private String duration;
    private String releaseDate;
    private double rating;
    private String imageUrl;
    private List<Date> showDates;
}
