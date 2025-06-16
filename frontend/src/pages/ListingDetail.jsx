import axios from "../api/axiosInstace.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState({ media: [] });
  const [isFavorite, setIsFavorite] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const loadListingById = async (listingId) => {
      try {
        const response = await axios.get(`/api/listing/${listingId}`);
        console.log("Response:", response.data.body.data);
        setListing(response.data.body.data);
      } catch (error) {
        console.error("Failed to fetch listing", error);
      }
    };

    if (id) {
      loadListingById(id);
    }
  }, [id]);

  const handleBooking = () => {
    alert(`Booking scheduled for ${date}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {listing.media?.map(({ id, url }) => (
          <img key={id} src={url} alt="" className="rounded-lg" />
        ))}
      </div>

      <p className="mb-4 text-gray-700">{listing.description}</p>
      <p className="mb-2 font-semibold">Address: {listing.address}</p>
      <p className="mb-6 font-bold text-blue-600 text-xl">
        ${listing.price?.toLocaleString()}
      </p>

      <button
        onClick={() => setIsFavorite((prev) => !prev)}
        className={`px-4 py-2 rounded-lg mr-4 ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Schedule a Viewing:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-lg mr-10"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default ListingDetail;
