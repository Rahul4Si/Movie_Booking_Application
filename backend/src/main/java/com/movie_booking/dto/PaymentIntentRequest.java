package com.movie_booking.backend.dto;

import lombok.Data;


@Data
public class PaymentIntentRequest {
    private Double amount;
    private Long bookingId;
    private String currency;
}
