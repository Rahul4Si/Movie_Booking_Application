package com.movie_booking.backend.dto;

import lombok.Data;


@Data
public class PaymentConfirmRequest {
    private String paymentIntentId;
    private Long bookingId;
}