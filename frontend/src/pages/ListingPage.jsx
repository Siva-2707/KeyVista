import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axiosInstace";
import ListingCard from "../components/ListingCard";
import { Modal, Button, Form } from "react-bootstrap";
import ListingModel from "../components/ListingModel";
import AppContext from "../context/AppContext";

const ListingPage = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {isAdmin} = useContext(AppContext);

  const fetchLocation = async () => {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;
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
  }, [search, listing]);

  if (loading) return <div className="p-6">Loading listings...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[80%] p-3 border rounded-lg"
        />
        {isAdmin && <Button onClick={() => setShowModal(true)}>Create Listing</Button>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((listing) => (
            <ListingCard listing={listing} key={listing.id} />
          ))
        ) : (
          <h2>No Listings</h2>
        )}
      </div>

        <ListingModel showModal={showModal} setShowModal={setShowModal}/>
    </div>
  );
};

export default ListingPage;
