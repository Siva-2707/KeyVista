package com.siva.keyvista.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "_user")
public class User{

//    User
//- id: Integer
//- role: Enum - ADMIN | USER
//- name: String
//- email: String
//- savedListing: Class<List<SavedListing>>
//- bookedListing: Class<List<BookedListing>>

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String name;
    private String password;
    private String email;
//    private SavedListing savedListing;
//    private BookedListing bookedListing;


}
