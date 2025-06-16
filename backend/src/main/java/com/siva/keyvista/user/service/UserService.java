package com.siva.keyvista.user.service;

import com.siva.keyvista.user.model.Role;
import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.repository.UserRespository;
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
                .role((userRequest.isAdmin() !=null && userRequest.isAdmin() ) ? Role.ADMIN : Role.USER)
                .email(userRequest.email())
                .password(passwordEncoder.encode(userRequest.password()))
                .name(String.join(userRequest.firstName()," ", userRequest.lastName()))
                .build();
        return userRespository.save(user);
    }


}
