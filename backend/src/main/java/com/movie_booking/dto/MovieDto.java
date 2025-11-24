package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {
    private String title;
    private String overview;
    private String poster_path;
    private String backdrop_path;
    private String release_date;
    private String original_language;
    private String tagline;
    private String genres;
    private String cast;
    private double rating;
    private int runtime;
}
