package com.siva.keyvista.user.service;

import com.siva.keyvista.exception.custom.AlreadyExistException;
import com.siva.keyvista.user.model.Role;
import com.siva.keyvista.user.model.User;
import com.siva.keyvista.user.repository.UserRespository;
import com.siva.keyvista.user.model.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(UserRequest userRequest){
        //Check if the user is already present
        String username = userRequest.email();
        if(checkUsernameExists(username))
            throw new AlreadyExistException(String.format("User already exit with this username: %s",username));

        return userRespository.save(getUserFromUserRequest(userRequest));
    }

    public User getUserFromUsername(String username){
        return userRespository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User not found with email: %s",username)));
    }

    public Boolean checkUsernameExists(String username){
        return userRespository.findByEmail(username).isPresent();
    }

    public User getUserFromUserRequest(UserRequest userRequest){
        return User.builder()
                .role((userRequest.isAdmin() !=null && userRequest.isAdmin() ) ? Role.ADMIN : Role.USER)
                .email(userRequest.email())
                .password(passwordEncoder.encode(userRequest.password()))
                .name(String.join(userRequest.firstName()," ", userRequest.lastName()))
                .build();
    }


}
