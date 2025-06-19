package com.siva.keyvista.security.service;

import com.siva.keyvista.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private static final String SECRET_KEY = "0123456789abcdef0123456789abcdef"; // 32 chars
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(SECRET_KEY);
    }

    @Test
    void generateToken_and_extractUsername_shouldWork() {
        String username = "testuser";
        String token = jwtService.generateToken(username);

        assertNotNull(token);
        String extracted = jwtService.extractUsername(token);
        assertEquals(username, extracted);
    }

    @Test
    void isTokenValid_shouldReturnTrueForValidToken() {
        String username = "validuser";
        String token = jwtService.generateToken(username);

        assertTrue(jwtService.isTokenValid(token, username));
    }

    @Test
    void isTokenValid_shouldReturnFalseForInvalidUsername() {
        String token = jwtService.generateToken("user1");
        assertFalse(jwtService.isTokenValid(token, "user2"));
    }

    @Test
    void constructor_shouldThrowExceptionForShortSecret() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                new JwtService("shortsecretkey")
        );
        assertTrue(ex.getMessage().contains("at least 32 characters"));
    }
}