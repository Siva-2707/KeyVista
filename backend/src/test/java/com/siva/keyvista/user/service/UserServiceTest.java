package com.siva.keyvista.user.service;

import com.siva.keyvista.user.model.Role;
import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.model.UserRequest;
import com.siva.keyvista.user.repository.UserRespository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRespository userRespository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRespository = mock(UserRespository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserService(userRespository, passwordEncoder);
    }

    @Test
    void createUser_shouldSaveUserWithEncodedPasswordAndUserRole() {
        // Arrange
        UserRequest userRequest = new UserRequest("john.doe@example.com", "password123", "John", "Doe", false);
        String encodedPassword = "encodedPassword";
        when(passwordEncoder.encode("password123")).thenReturn(encodedPassword);

        User savedUser = User.builder()
                .email("john.doe@example.com")
                .password(encodedPassword)
                .name("John Doe")
                .role(Role.USER)
                .build();
        when(userRespository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser(userRequest);

        // Assert
        assertEquals(savedUser, result);
    }
}