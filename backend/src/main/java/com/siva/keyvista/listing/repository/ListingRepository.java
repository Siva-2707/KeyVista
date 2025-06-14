package com.siva.keyvista.listing.repository;

import com.siva.keyvista.listing.model.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Integer> {

    Optional<List<Listing>> findListingByCityOrCountry(String city, String country);
    
}
