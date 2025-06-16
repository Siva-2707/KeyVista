import React, { useState } from "react";
import { useParams } from "react-router-dom";

const mockListing = {
  id: 1,
  name: "Cozy Apartment",
  images: [
    "https://source.unsplash.com/800x600/?apartment",
    "https://source.unsplash.com/800x600/?kitchen",
  ],
  description: "A cozy apartment in the heart of the city.",
  address: "123 Main St",
  price: 400000,
};

const ListingDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [date, setDate] = useState("");

  const handleBooking = () => {
    alert(`Booking scheduled for ${date}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{mockListing.name}</h1>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {mockListing.images.map((img, idx) => (
          <img key={idx} src={img} alt="" className="rounded-lg" />
        ))}
      </div>

      <p className="mb-4 text-gray-700">{mockListing.description}</p>
      <p className="mb-2 font-semibold">Address: {mockListing.address}</p>
      <p className="mb-6 font-bold text-blue-600 text-xl">
        ${mockListing.price.toLocaleString()}
      </p>

      {/* Favorite button */}
      <button
        onClick={() => setIsFavorite((prev) => !prev)}
        className={`px-4 py-2 rounded-lg mr-4 ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>

      {/* Booking section */}
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
