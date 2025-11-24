package com.movie_booking.backend.service;

import com.movie_booking.backend.dto.ApiResponse;
import com.movie_booking.backend.dto.LoginDto;
import com.movie_booking.backend.dto.LoginResponse;
import com.movie_booking.backend.dto.RegisterDto;
import com.movie_booking.backend.entity.Role;
import com.movie_booking.backend.entity.User;
import com.movie_booking.backend.repository.RoleRepository;
import com.movie_booking.backend.repository.UserRepository;
import com.movie_booking.backend.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserAuthImpl implements UserAuth{


    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Value("${admin.secret.password}")
    private String adminSecretPassword;



    @Override
    public ResponseEntity<?> login(LoginDto loginDto) {
        try {
            // Validate username
            if (!userRepository.existsByUsername(loginDto.getUsername())) {
                return ResponseEntity.badRequest().body(new ApiResponse<>("Invalid username", false, null));
            }
            // Validate password
            if (!passwordEncoder.matches(loginDto.getPassword(), userRepository.findByUsername(loginDto.getUsername()).get().getPassword())) {
                return ResponseEntity.badRequest().body(new ApiResponse<>("Invalid password", false, null));
            }


            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );
            User user = userRepository.findByUsername(loginDto.getUsername()).get();
            String token = jwtUtils.generateToken(authentication);
            LoginResponse loginResponse = new LoginResponse(token, user.getRoles().iterator().next().getName(), user.getUsername());
            return ResponseEntity.ok(new ApiResponse<LoginResponse>("Login successful", true, loginResponse));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>("Invalid credentials", false, null));
        }
    }


    @Override
    public ResponseEntity<?> register(RegisterDto req) {
        try{
            // Validate username and email
            if (userRepository.existsByUsername(req.getUsername())) {
                return ResponseEntity.badRequest().body(new ApiResponse<>("Username already exists", false, null));
            }
            if (userRepository.existsByEmail(req.getEmail())) {
                return ResponseEntity.badRequest().body(new ApiResponse<>("Email already exists", false, null));
            }


            // Create new user
            User user = new User();
            user.setName(req.getName());
            user.setUsername(req.getUsername());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setEmail(req.getEmail());


            Set<Role> roles = new HashSet<>();


            if ( !req.getPassword().equals(adminSecretPassword)) {
                Role r = roleRepository.findByName("ROLE_USER")
                        .orElseGet(() -> {
                            Role role = new Role();
                            role.setName("ROLE_USER");
                            return roleRepository.save(role);
                        });
                roles.add(r);
            } else{
                Role r = roleRepository.findByName("ROLE_ADMIN")
                        .orElseGet(() -> {
                            Role role = new Role();
                            role.setName("ROLE_ADMIN");
                            return roleRepository.save(role);
                        });
                roles.add(r);
            }
            user.setRoles(roles);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("User registered successfully", true, null));
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>("Registration failed: " + e.getMessage(), false, null));
        }
    }
}
