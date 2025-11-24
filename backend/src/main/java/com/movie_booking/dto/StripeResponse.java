package com.movie_booking.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class StripeResponse {
    private String status;
    private String message;
    private String sessionId;
    private String sessionUrl;
}