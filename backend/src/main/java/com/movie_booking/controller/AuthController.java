package com.movie_booking.backend.controller;

import com.movie_booking.backend.dto.LoginDto;
import com.movie_booking.backend.dto.RegisterDto;
import com.movie_booking.backend.service.UserAuthImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {


    private final UserAuthImpl userAuthImpl;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return userAuthImpl.login(loginDto);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        return userAuthImpl.register(registerDto);
    }
}

