package com.siva.keyvista.security.controller;


import com.siva.keyvista.security.model.AuthRequest;
import com.siva.keyvista.security.service.JwtService;
import com.siva.keyvista.user.Role;
import com.siva.keyvista.user.User;
import com.siva.keyvista.user.model.UserRequest;
import com.siva.keyvista.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/getToken")
    public String login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
        if(authentication.isAuthenticated())
            return  jwtService.generateToken(authRequest.username());
        throw new RuntimeException();
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequest userRequest) {
        User createdUser = userService.createUser(userRequest);
        return jwtService.generateToken(createdUser.getUsername());
    }
}
