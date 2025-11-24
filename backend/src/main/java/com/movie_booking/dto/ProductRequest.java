package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private Long amount;
    private Long quantity;
    private String name;
    private String currency;
}
