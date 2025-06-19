package com.siva.keyvista.security.controller;


import com.siva.keyvista.security.model.AuthRequest;
import com.siva.keyvista.security.service.JwtService;
import com.siva.keyvista.user.model.Role;
import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.model.UserRequest;
import com.siva.keyvista.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
        if(authentication.isAuthenticated())
            return  jwtService.generateToken(authRequest.username());
        throw new RuntimeException();
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequest userRequest) {
        User createdUser = userService.createUser(userRequest);
        return jwtService.generateToken(createdUser.getEmail());
    }

    @PostMapping("/token/validate")
    @ResponseStatus(HttpStatus.OK)
    public boolean validateToken(@RequestParam String username, @RequestParam String token ) {
        return jwtService.isTokenValid(token, username);
    }

    @GetMapping("/token/role")
    @ResponseStatus(HttpStatus.OK)
    public Role getRoleFromToken(@RequestParam String token) {
        return jwtService.getRoleFromToken(token);
    }


}
