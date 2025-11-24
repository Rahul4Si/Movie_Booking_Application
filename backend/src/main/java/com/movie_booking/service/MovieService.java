package com.movie_booking.backend.service;

import com.movie_booking.backend.dto.BookingRequestDto;
import com.movie_booking.backend.dto.MovieDto;
import com.movie_booking.backend.dto.ShowDto;
import org.springframework.http.ResponseEntity;

public interface MovieService {
    ResponseEntity<?> addMovies(MovieDto movieDto);
    ResponseEntity<?> getAllMovies();
    ResponseEntity<?> addShow(ShowDto showDto);
    ResponseEntity<?> getAllShows();
    ResponseEntity<?> getAdminAllShows();
    ResponseEntity<?> getShowById(Long id);
    ResponseEntity<?> getShowByIdAndDate(Long id, String date);
    ResponseEntity<?> bookShow(BookingRequestDto bookingRequestDto);
    ResponseEntity<?> getAllBookings();
    ResponseEntity<?> addToFavourites(Long showId);
    ResponseEntity<?> getFavourites();
    ResponseEntity<?> deleteShow(Long showId);
    ResponseEntity<?> checkFavourite(Long id);
    ResponseEntity<?> removeFromFavourites(Long id);
    ResponseEntity<?> getAdminDashboardData();
}
