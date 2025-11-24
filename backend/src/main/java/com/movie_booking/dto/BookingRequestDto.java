package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {
    private Long showId;
    private double price;
    private String[] seats;
}