package com.siva.keyvista.security.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(@Value("${jwt.secret-key}") String jwtSecretKey) {
        if (jwtSecretKey == null || jwtSecretKey.length() < 32) {
            throw new IllegalArgumentException("JWT secret key must be at least 32 characters.");
        }
        this.secretKey = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        return Jwts
                .builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isTokenValid(String jwt, String username) {

        return extractUsername(jwt).equals(username) && Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(jwt)
                .getPayload().getExpiration().after(new Date());
    }


}
