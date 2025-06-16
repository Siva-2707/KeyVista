package com.siva.keyvista.listing.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Listing {

//    Listing
//- name: String
//- address: String
//- locality: String
//- status: Enum<Status> - Available | On Hold | Sold
//- price: Double
//- media: String | S3 Link
//- dateAndTimePosted: Date
//- dateAndTimeUpdated: Date
//- listingSchedule: Class
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String address;
    private String city;
    private String country;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Double price;
    private String description;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Link> media;
    private Date dateTimePosted;
    private Date dateTimeUpdated;
//    private List<Schedule> scheduleList;

}
