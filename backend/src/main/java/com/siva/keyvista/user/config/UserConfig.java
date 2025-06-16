package com.siva.keyvista.user.config;

import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.model.UserPrinciple;
import com.siva.keyvista.user.repository.UserRespository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.NoSuchElementException;

@Configuration
public class UserConfig {

    @Bean
    public UserDetailsService userDetailsService(UserRespository userRespository) {
        return (username) -> new UserPrinciple(
                userRespository.findByEmail(username)
                        .orElseThrow(() -> new NoSuchElementException("No such user: " + username))
        );
    }
}
