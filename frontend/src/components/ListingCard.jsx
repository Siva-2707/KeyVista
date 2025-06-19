import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
// import AppContext from '../context/AppContext'

const ListingCard = ({listing , key}) => {

  const navigate = useNavigate();
    // const {isAdmin} = useContext(AppContext);
  const handleEdit = () => {
    console.log("Hello");
  }
  return (
    <div className="border rounded-lg shadow hover:shadow-xl">
        <div
            key={key}
            className="cursor-pointer"
            onClick={() => navigate(`/listings/${listing.id}`)}>
            <img
            src={listing.media?.[0]?.url || "https://via.placeholder.com/400x300"}
            alt={listing.name}
            className="w-full h-48 object-cover rounded-t-lg"/>
            <div className="p-4">
                <h2 className="text-xl font-bold">{listing.name}</h2>
                <p className="text-gray-600">{listing.address}</p>
                <p className="text-blue-600 font-semibold">
                    ${listing.price?.toLocaleString?.() || "N/A"}
                </p>
            </div>
        </div>
        <div className='flex p-4 justify-end gap-2'>
            <Button variant="primary" onClick={handleEdit}>Edit</Button>
            <Button variant="danger">Delete</Button>
        </div>
    </div>
  )
}

export default ListingCard