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

    public List<Listing> getListingsByLocation(String city, String country){
            return listingRepository.findListingByCityOrCountry(city, country).orElse(new ArrayList<>());
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

    public Listing updateListing(Listing listing){
        Listing existingListing = getListing(listing.getId());
        existingListing.setName(listing.getName());
        existingListing.setAddress(listing.getAddress());
        existingListing.setCity(listing.getCity());
        existingListing.setCountry(listing.getCountry());
        existingListing.setStatus(listing.getStatus());
        existingListing.setPrice(listing.getPrice());
        existingListing.setDescription(listing.getDescription());
        existingListing.setMedia(listing.getMedia());
        existingListing.setDateTimeUpdated(new Date());
        return listingRepository.save(existingListing);
    }

    public void deleteListing(Integer id) {
        Listing listing = getListing(id);
        listingRepository.delete(listing);
    }
}
