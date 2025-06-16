package com.siva.keyvista.listing.controller;


import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.service.ListingService;
import com.siva.keyvista.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ListingAdminController {

    private final ListingService listingService;

    private static final String CREATE_SUCCESS = "Listing created successfully.";

    @PostMapping("/create/listing")
    @ResponseStatus(HttpStatus.CREATED)
    public KeyVistaResponse<ResponseEntity> createListing(@RequestBody KeyVistaRequest<Listing> request){
            return new KeyVistaResponse<>(
                    HttpStatus.OK,
                    CREATE_SUCCESS,
                    new SuccessResponseEntity<>(
                            listingService.createListing(request.body()))
                    );
    }
}
