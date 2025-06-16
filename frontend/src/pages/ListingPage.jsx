import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstace";

const ListingPage = ({ location }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialListings = async () => {
      try {
        const response = await axios.get(
          `api/listings?city=${location.city}&country=${location.country}`
        );
        console.log("Data: ",response.data)
        setListing(response.data.body.data);
        setFiltered(response.data.body.data); // initialize filtered listings
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (location?.city && location?.country) {
      fetchInitialListings();
    }
  }, [location.city, location.country]);

  useEffect(() => {
    setFiltered(
      listing.length> 0 ? listing.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      ) : []
    );
  }, [search, listing]);

  if (loading) return <div className="p-6">Loading listings...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

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
        { filtered.length>0 ?  filtered.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg shadow hover:shadow-xl cursor-pointer"
            onClick={() => navigate(`/listings/${listing.id}`)}
          >
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{listing.name}</h2>
              <p className="text-gray-600">{listing.address}</p>
              <p className="text-blue-600 font-semibold">
                ${listing.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))
            : <h2>No Listings </h2>
        }
      </div>
    </div>
  );
};

export default ListingPage;
