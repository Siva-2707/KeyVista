package com.siva.keyvista.listing.controller;


import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.service.ListingService;
import com.siva.keyvista.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ListingAdminController {

    private final ListingService listingService;

    private static final String CREATE_SUCCESS = "Listing created successfully.";
    private static final String EDIT_SUCCESS = "Listing updated successfully.";

    @PostMapping("/create/listing")
    @ResponseStatus(HttpStatus.CREATED)
    public KeyVistaResponse<Listing> createListing(@RequestBody KeyVistaRequest<Listing> request){
            return new KeyVistaResponse<>(
                    HttpStatus.OK,
                    CREATE_SUCCESS,
                    listingService.createListing(request.body()));
    }

    @PostMapping("/update/listing")
    @ResponseStatus(HttpStatus.OK)
    public KeyVistaResponse<Listing> updateListing(@RequestBody KeyVistaRequest<Listing> request){
        return new KeyVistaResponse<>(
                HttpStatus.OK,
                EDIT_SUCCESS,
                listingService.updateListing(request.body()));
    }

    @PostMapping("/delete/listing")
    @ResponseStatus(HttpStatus.OK)
    public KeyVistaResponse<String> deleteListing(@RequestParam Integer id){
        listingService.deleteListing(id);
        return new KeyVistaResponse<>(
                HttpStatus.OK,
                "Listing deleted successfully.",
                "Listing with id - " + id + " deleted successfully.");
    }


}
