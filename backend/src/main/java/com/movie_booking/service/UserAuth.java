package com.movie_booking.backend.service;

import com.movie_booking.backend.dto.LoginDto;
import com.movie_booking.backend.dto.RegisterDto;
import org.springframework.http.ResponseEntity;

public interface UserAuth {
    ResponseEntity<?> login(LoginDto loginDto);
    ResponseEntity<?> register(RegisterDto req);
}
