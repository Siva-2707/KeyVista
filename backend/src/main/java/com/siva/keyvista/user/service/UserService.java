package com.siva.keyvista.user.service;

import com.siva.keyvista.user.Role;
import com.siva.keyvista.user.User;
import com.siva.keyvista.user.UserRespository;
import com.siva.keyvista.user.model.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(UserRequest userRequest){
        User user = User.builder()
                .role(Role.USER)
                .email(userRequest.email())
                .password(passwordEncoder.encode(userRequest.password()))
                .name(String.join(userRequest.firstName()," ", userRequest.lastName()))
                .build();
        return userRespository.save(user);
    }


}
