package com.movie_booking.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "booking_details")
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private Long showId;
    private double amount;
    private List<String> bookedSeats;
    private boolean paid = false;
    private String paymentLink;
    private Date bookedDateTime = new Date();
}
