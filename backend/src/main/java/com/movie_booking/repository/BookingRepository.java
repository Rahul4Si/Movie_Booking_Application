package com.movie_booking.backend.repository;

import com.movie_booking.backend.entity.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingDetails,Long> {
    List<BookingDetails> findByPaid(boolean paid );;
}
