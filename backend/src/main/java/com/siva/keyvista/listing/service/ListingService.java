package com.siva.keyvista.listing.service;

import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    public List<Listing> getAllListing(){
        return listingRepository.findAll();
    }

    public Optional<List<Listing>> getListingsByLocation(String city, String country){
            return listingRepository.findListingByCityOrCountry(city, country);
    }

    public Listing createListing(Listing listing){
        return listingRepository.save(listing);
    }

}
