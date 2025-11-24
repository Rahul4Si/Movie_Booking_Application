package com.movie_booking.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    private final Key key;
    private final long expirationMs;


    public JwtUtils(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration-ms}") long expirationMs) {
        try {
            this.key = getKey(secret);
            this.expirationMs = expirationMs;
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to initialize JWT utils: " + e.getMessage(), e);
        }
    }


    public Key getKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }


    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());


        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);


        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // log if needed
        }
        return false;
    }


    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().verifyWith((SecretKey) key).build()
                .parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }


    @SuppressWarnings("unchecked")
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser().verifyWith((SecretKey) key).build()
                .parseSignedClaims(token).getPayload();
        Object roles = claims.get("roles");
        if (roles instanceof List) return (List<String>) roles;
        return List.of();
    }
}

