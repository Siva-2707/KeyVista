import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[90vh] flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?house,real-estate')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Home</h1>
          <p className="text-lg md:text-xl mb-8">Browse listings, book viewings, and connect with realtors — all in one place.</p>
          {/* <a href="/listings" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg transition">Explore Listings</a> */}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Why Use Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Verified Listings</h3>
              <p className="text-gray-600">All properties are verified and updated regularly by our realtors.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Easy Appointments</h3>
              <p className="text-gray-600">Book property viewings that fit your schedule in just a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
              <p className="text-gray-600">Message realtors directly for questions or offers – no middlemen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="text-lg mb-8">Join hundreds of happy home buyers and sellers using KeyVista.</p>
        <a href="/signup" className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl text-lg hover:bg-gray-100 transition">Sign Up Now</a>
      </section>
    </div>
  );
};

export default Home;
