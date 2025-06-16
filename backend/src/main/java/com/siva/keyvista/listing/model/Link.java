package com.siva.keyvista.listing.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URL;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Link {
    @Id
    @GeneratedValue
    private Integer id;
    private String url;
}
