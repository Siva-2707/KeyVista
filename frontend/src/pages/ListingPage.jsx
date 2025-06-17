import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstace";

const ListingPage = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [listing, setListing] = useState([]); // ✅ make sure default is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLocation = async () => {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.village;
      const country = data.address.country;

      return { city, country };
    } catch (err) {
      console.error("Location fallback:", err);
      return { city: "Halifax", country: "Canada" };
    }
  };

  useEffect(() => {
    const fetchInitialListings = async () => {
      try {
        const location = await fetchLocation();
        const response = await axios.get(
          `api/listings?city=${location.city}&country=${location.country}`
        ); 

        const data = response?.data?.body || [];
        setListing(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialListings();
  }, []);

  useEffect(() => {
    setFiltered(
      Array.isArray(listing)
        ? listing.filter((l) =>
            l.name.toLowerCase().includes(search.toLowerCase())
          )
        : []
    );
  }, [search, listing]); // ✅ guard against non-array

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
        {Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((listing) => (
            <div
              key={listing.id}
              className="border rounded-lg shadow hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              <img
                src={listing.media?.[0]?.url || "https://via.placeholder.com/400x300"}
                alt={listing.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{listing.name}</h2>
                <p className="text-gray-600">{listing.address}</p>
                <p className="text-blue-600 font-semibold">
                  ${listing.price?.toLocaleString?.() || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2>No Listings</h2>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
