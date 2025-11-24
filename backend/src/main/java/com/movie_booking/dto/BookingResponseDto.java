package com.movie_booking.backend.dto;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {
    private Long id;
    private Long showId;
    private String title;
    private String poster_path;
    private int duration;
    private int amount;
    private String[] bookedSeats;
    private boolean isPaid;
    private Date showDateTime;
}