package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowDto {
    private Long movieId;
    private String showDate;
    private String showTime;
    private double price;
}
