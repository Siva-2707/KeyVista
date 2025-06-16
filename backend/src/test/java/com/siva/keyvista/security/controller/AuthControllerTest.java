// File: src/test/java/com/siva/keyvista/security/controller/AuthControllerTest.java
package com.siva.keyvista.security.controller;

import com.siva.keyvista.security.model.AuthRequest;
import com.siva.keyvista.security.service.JwtService;
import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.model.UserRequest;
import com.siva.keyvista.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private UserService userService;
    private AuthController authController;

    @BeforeEach
    void setUp() {
        authenticationManager = mock(AuthenticationManager.class);
        jwtService = mock(JwtService.class);
        userService = mock(UserService.class);
        authController = new AuthController(authenticationManager, jwtService, userService);
    }

    @Test
    void login_shouldReturnToken_whenAuthenticated() {
        AuthRequest authRequest = new AuthRequest("user", "pass");
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(jwtService.generateToken("user")).thenReturn("jwt-token");

        String result = authController.login(authRequest);

        assertEquals("jwt-token", result);
        verify(jwtService).generateToken("user");
    }

    @Test
    void login_shouldThrowException_whenNotAuthenticated() {
        AuthRequest authRequest = new AuthRequest("user", "pass");
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(false);

        assertThrows(RuntimeException.class, () -> authController.login(authRequest));
    }

    @Test
    void register_shouldCreateUserAndReturnToken() {
        UserRequest userRequest = new UserRequest("email", "pass", "First", "Last");
        User user = mock(User.class);
        when(userService.createUser(userRequest)).thenReturn(user);
        when(user.getEmail()).thenReturn("email");
        when(jwtService.generateToken("email")).thenReturn("jwt-token");

        String result = authController.register(userRequest);

        assertEquals("jwt-token", result);
        verify(userService).createUser(userRequest);
        verify(jwtService).generateToken("email");
    }
}