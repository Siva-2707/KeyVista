import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [savedListings, setSavedListings] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual backend endpoints
  const SAVED_LISTINGS_API = "/api/user/saved-listings";
  const UPCOMING_EVENTS_API = "/api/user/upcoming-events";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [savedRes, eventsRes] = await Promise.all([
          fetch(SAVED_LISTINGS_API),
          fetch(UPCOMING_EVENTS_API),
        ]);
        const [savedData, eventsData] = await Promise.all([
          savedRes.json(),
          eventsRes.json(),
        ]);
        setSavedListings(savedData);
        setUpcomingEvents(eventsData);
      } catch (err) {
        setSavedListings([]);
        setUpcomingEvents([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">My Dashboard</h1>
        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : (
          <>
            {/* Saved Listings */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Saved Listings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {savedListings.length === 0 ? (
                  <div className="col-span-2 text-gray-500 text-center py-6">No saved listings.</div>
                ) : (
                  savedListings.map((listing, idx) => (
                    <div key={listing.id || idx} className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold mb-2">{listing.title || "Listing"}</h3>
                      <p className="mb-1 text-gray-700">{listing.address || "No address provided"}</p>
                      <p className="mb-1 text-gray-600">{listing.description || ""}</p>
                      <div className="text-sm text-gray-500">
                        {listing.price ? `Price: $${listing.price}` : ""}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Upcoming Scheduled Listing Events */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Scheduled Events</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 text-left">Listing</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Time</th>
                      <th className="py-2 px-4 text-left">Realtor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingEvents.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">No upcoming events.</td>
                      </tr>
                    ) : (
                      upcomingEvents.map((event, idx) => (
                        <tr key={event.id || idx} className="border-b">
                          <td className="py-2 px-4">{event.listingTitle || event.listing || "-"}</td>
                          <td className="py-2 px-4">{event.date ? new Date(event.date).toLocaleDateString() : "-"}</td>
                          <td className="py-2 px-4">{event.time || (event.date ? new Date(event.date).toLocaleTimeString() : "-")}</td>
                          <td className="py-2 px-4">{event.realtorName || event.realtor || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;