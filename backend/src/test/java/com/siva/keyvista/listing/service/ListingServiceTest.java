// File: src/test/java/com/siva/keyvista/listing/service/ListingServiceTest.java
package com.siva.keyvista.listing.service;

import com.siva.keyvista.listing.model.Link;
import com.siva.keyvista.listing.model.Listing;
import com.siva.keyvista.listing.model.Status;
import com.siva.keyvista.listing.repository.ListingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ListingServiceTest {

    private ListingRepository listingRepository;
    private ListingService listingService;

    @BeforeEach
    void setUp() {
        listingRepository = mock(ListingRepository.class);
        listingService = new ListingService(listingRepository);
    }

    @Test
    void getAllListing_shouldReturnAllListings() {
        List<Listing> listings = Arrays.asList(mock(Listing.class), mock(Listing.class));
        when(listingRepository.findAll()).thenReturn(listings);

        List<Listing> result = listingService.getAllListing();

        assertEquals(listings, result);
        verify(listingRepository).findAll();
    }

    @Test
    void getListingsByLocation_shouldReturnListings() {
        List<Listing> listings = Collections.singletonList(mock(Listing.class));
        when(listingRepository.findListingByCityOrCountry("city", "country")).thenReturn(Optional.of(listings));

        List<Listing> result = listingService.getListingsByLocation("city", "country");

        assertEquals(listings, result);
    }

    @Test
    void getListingsByLocation_shouldReturnEmptyListIfNotFound() {
        when(listingRepository.findListingByCityOrCountry("city", "country")).thenReturn(Optional.empty());

        List<Listing> result = listingService.getListingsByLocation("city", "country");

        assertTrue(result.isEmpty());
    }

    @Test
    void createListing_shouldSetDateTimePostedAndSave() {
        Listing listing = new Listing();
        Listing savedListing = new Listing();
        when(listingRepository.save(any(Listing.class))).thenReturn(savedListing);

        Listing result = listingService.createListing(listing);

        assertNotNull(listing.getDateTimePosted());
        assertEquals(savedListing, result);
        verify(listingRepository).save(listing);
    }

    @Test
    void getListing_shouldReturnListingIfExists() {
        Listing listing = new Listing();
        when(listingRepository.findById(1)).thenReturn(Optional.of(listing));

        Listing result = listingService.getListing(1);

        assertEquals(listing, result);
    }

    @Test
    void getListing_shouldThrowIfNotFound() {
        when(listingRepository.findById(1)).thenReturn(Optional.empty());

        NoSuchElementException ex = assertThrows(NoSuchElementException.class, () -> listingService.getListing(1));
        assertTrue(ex.getMessage().contains("Listing with id - 1 not found"));
    }

    @Test
    void updateListing_shouldUpdateAndSaveListing() {
        Listing existing = new Listing();
        existing.setId(1);
        when(listingRepository.findById(1)).thenReturn(Optional.of(existing));
        when(listingRepository.save(any(Listing.class))).thenReturn(existing);

        Listing update = new Listing();
        update.setId(1);
        update.setName("name");
        update.setAddress("address");
        update.setCity("city");
        update.setCountry("country");
        update.setStatus(Status.AVAILABLE);
        update.setPrice(100.0);
        update.setDescription("desc");
        Link link1 = new Link();
        link1.setUrl("url1");
        Link link2 = new Link();
        link2.setUrl("url2");
        update.setMedia(List.of(link1, link2));

        Listing result = listingService.updateListing(update);

        assertEquals("name", existing.getName());
        assertEquals("address", existing.getAddress());
        assertEquals("city", existing.getCity());
        assertEquals("country", existing.getCountry());
        assertEquals(Status.AVAILABLE, existing.getStatus());
        assertEquals(100.0, existing.getPrice());
        assertEquals("desc", existing.getDescription());
        assertEquals(List.of(link1,link2), existing.getMedia());
        assertNotNull(existing.getDateTimeUpdated());
        assertEquals(existing, result);
    }

    @Test
    void deleteListing_shouldDeleteListing() {
        Listing listing = new Listing();
        when(listingRepository.findById(1)).thenReturn(Optional.of(listing));

        listingService.deleteListing(1);

        verify(listingRepository).delete(listing);
    }
}