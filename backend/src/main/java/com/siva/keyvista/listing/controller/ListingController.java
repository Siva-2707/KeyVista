package com.siva.keyvista.listing.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ListingController {

    @GetMapping("/listings")
    public List<String> getAllListings(){
        return List.of("House1","House1","House1","House1","House1");
    }
}
