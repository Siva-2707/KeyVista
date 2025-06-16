package com.siva.keyvista.listing.service;

import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.text.MessageFormat;
import java.util.*;

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
        listing.setDateTimePosted(new Date());
        return listingRepository.save(listing);
    }

    public Listing getListing(Integer id) {
        return listingRepository.findById(id)
                .orElseThrow(() ->  new NoSuchElementException(
                        MessageFormat.format("Listing with id - {0} not found", id)));
    }
}
