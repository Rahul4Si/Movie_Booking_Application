package com.movie_booking.backend.controller;

import com.movie_booking.backend.dto.MovieDto;
import com.movie_booking.backend.dto.ShowDto;
import com.movie_booking.backend.service.MovieServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminMovieController {


    private final MovieServiceImpl movieService;


    @PostMapping("/add-movie")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addMovies(@RequestBody MovieDto movieDto) {
        try {
            return movieService.addMovies(movieDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-all-movies")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllMovies() {
        try {
            return movieService.getAllMovies();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/add-show")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addShow(@RequestBody ShowDto showDto) {
        try {
            return movieService.addShow(showDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-all-show")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllShows() {
        try {
            return movieService.getAdminAllShows();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/delete-show/{showId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteShow(@PathVariable Long showId) {
        try {
            return movieService.deleteShow(showId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-admin-dashboard-data")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAdminDashboardData() {
        try {
            return movieService.getAdminDashboardData();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

