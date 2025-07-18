package com.siva.keyvista.listing.controller;

import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.service.ListingService;
import com.siva.keyvista.util.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ListingController{


    private final ListingService listingService;

    @GetMapping("/listings")
    @ResponseStatus(HttpStatus.OK)
    public KeyVistaResponse<List<Listing>> getAllListingsByLocation(@RequestParam String city, @RequestParam String country){
            return new KeyVistaResponse<>(
                    HttpStatus.OK,
                    "Listings fetched successfully.",
                    listingService.getListingsByLocation(city,country));
    }

    @GetMapping("/listing/{id}")
    @ResponseStatus(HttpStatus.OK)
    public KeyVistaResponse<Listing> getListingById(@PathVariable Integer id){
        return new KeyVistaResponse<>(
                HttpStatus.OK,
                "Listing fetched successfully.",
                listingService.getListing(id));
    }


}
