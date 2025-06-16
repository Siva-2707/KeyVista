import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockListings = [
  { id: 1, name: "Cozy Apartment", address: "123 Main St", price: 400000, image: "https://source.unsplash.com/400x300/?apartment" },
  { id: 2, name: "Luxury Villa", address: "789 Beach Rd", price: 1200000, image: "https://source.unsplash.com/400x300/?villa" },
  // more mock data...
];

const ListingPage = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFiltered(
      mockListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <input
        type="text"
        placeholder="Search listings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg shadow hover:shadow-xl cursor-pointer"
            onClick={() => navigate(`/listings/${listing.id}`)}
          >
            <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{listing.name}</h2>
              <p className="text-gray-600">{listing.address}</p>
              <p className="text-blue-600 font-semibold">${listing.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
