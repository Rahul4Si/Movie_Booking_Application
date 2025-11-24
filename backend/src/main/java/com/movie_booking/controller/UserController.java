package com.movie_booking.backend.controller;

import com.movie_booking.backend.dto.BookingRequestDto;
import com.movie_booking.backend.service.MovieServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final MovieServiceImpl movieService;


    @GetMapping("/get-all-show")
    public ResponseEntity<?> getAllShows() {
        try {
            return movieService.getAllShows();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-show-by-id/{id}")
    public ResponseEntity<?> getShowById(@PathVariable Long id) {
        try {
            return movieService.getShowById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-show-by-id-and-date/{id}/{date}")
    public ResponseEntity<?> getShowByIdAndDate(@PathVariable Long id, @PathVariable String date) {
        try {
            return movieService.getShowByIdAndDate(id, date);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/book-show")
    public ResponseEntity<?> bookShow(@RequestBody BookingRequestDto bookingRequestDto) {
        try {
            return movieService.bookShow(bookingRequestDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-all-bookings")
    public ResponseEntity<?> getAllBookings() {
        try {
            return movieService.getAllBookings();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/add-to-favourites/{showId}")
    public ResponseEntity<?> addToFavourites(@PathVariable Long showId) {
        try {
            return movieService.addToFavourites(showId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-favourites")
    public ResponseEntity<?> getFavourites() {
        try {
            return movieService.getFavourites();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-all-movies")
    public ResponseEntity<?> getAllMovies() {
        try {
            return movieService.getAllMovies();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check-favourite/{id}")
    public ResponseEntity<?> checkFavourite(@PathVariable Long id) {
        try {
            return movieService.checkFavourite(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/remove-from-favourites/{id}")
    public ResponseEntity<?> removeFromFavourites(@PathVariable Long id) {
        try {
            return movieService.removeFromFavourites(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}

