import axios from "../../api/axiosInstace.js"; // Adjust the import path as necessary
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace these URLs with your actual backend endpoints
  const ENQUIRIES_API = "/api/query";
  // const BOOKINGS_API = "/api/bookings/upcoming";
  console.log("Enquiries API:", ENQUIRIES_API);
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const enqRes = await axios.get(ENQUIRIES_API);
        const enqData = await enqRes.data;
        setEnquiries(enqData);
        // setBookings(bookData);
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
        setEnquiries([]);
        // setBookings([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Admin Dashboard</h1>
        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : (
          <>
            {/* Customer Enquiries */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Customer Enquiries</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Email</th>
                      <th className="py-2 px-4 text-left">Message</th>
                      <th className="py-2 px-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">No enquiries found.</td>
                      </tr>
                    ) : (
                      enquiries.map((enq, idx) => (
                        <tr key={enq.id || idx} className="border-b">
                          <td className="py-2 px-4">{enq.name}</td>
                          <td className="py-2 px-4">{enq.email}</td>
                          <td className="py-2 px-4">{enq.message}</td>
                          <td className="py-2 px-4">{enq.date ? new Date(enq.date).toLocaleString() : "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Upcoming Booked Listings */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Booked Listings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 text-left">Listing</th>
                      <th className="py-2 px-4 text-left">Customer</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">No upcoming bookings.</td>
                      </tr>
                    ) : (
                      bookings.map((book, idx) => (
                        <tr key={book.id || idx} className="border-b">
                          <td className="py-2 px-4">{book.listingTitle || book.listing || "-"}</td>
                          <td className="py-2 px-4">{book.customerName || book.customer || "-"}</td>
                          <td className="py-2 px-4">{book.date ? new Date(book.date).toLocaleDateString() : "-"}</td>
                          <td className="py-2 px-4">{book.time || (book.date ? new Date(book.date).toLocaleTimeString() : "-")}</td>
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

export default AdminDashboard;