import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import AppContext from '../context/AppContext'
import ListingModel from './ListingModel';
import axios from "../api/axiosInstace";

const ListingCard = ({ listing, setListing, setFiltered }) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AppContext);

  // State for modal and editing
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Edit handler: open modal and pre-populate with listing data
  const handleEdit = () => {
    setEditData({
      ...listing,
      mediaInput: listing.media?.map(m => m.url).join('\n') || ""
    });
    setShowModal(true);
  };

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.post(`/api/admin/delete/listing?id=${listing.id}`);
        setListing(prev => prev.filter(l => l.id !== listing.id));
        setFiltered(prev => prev.filter(l => l.id !== listing.id));
      } catch (err) {
        alert("Failed to delete listing.");
      }
    }
  };

  // Callback for updating listing after edit
  const handleUpdate = (updatedListing) => {
    setListing(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    setFiltered(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    setShowModal(false);
    setEditData(null);
  };

  return (
    <>
      <div className="border rounded-lg shadow hover:shadow-xl">
        <div
          className={isAdmin ? "" : "cursor-pointer"}
          onClick={() => isAdmin ? "" : navigate(`/listings/${listing.id}`)}>
          <img
            src={listing.media?.[0]?.url || "https://via.placeholder.com/400x300"}
            alt={listing.name}
            className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p className="text-gray-600">{listing.address}</p>
            <p className="text-blue-600 font-semibold">
              ${listing.price?.toLocaleString?.() || "N/A"}
            </p>
          </div>
        </div>
        {isAdmin &&
          <div className='flex p-4 justify-end gap-2'>
            <Button variant="primary" onClick={handleEdit}>Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>}
      </div>
      {/* ListingModel for editing */}
      {showModal && (
        <ListingModel
          showModal={showModal}
          setShowModal={setShowModal}
          setListing={setListing}
          setFiltered={setFiltered}
          editData={editData}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}

export default ListingCard