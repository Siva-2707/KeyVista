import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from "react-bootstrap";
import axios from "../api/axiosInstace";

const ListingModel = ({ showModal, setShowModal, setListing, setFiltered, editData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    status: "AVAILABLE",
    price: "",
    description: "",
    mediaInput: "",
  });

  // Pre-populate form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        address: editData.address || "",
        city: editData.city || "",
        country: editData.country || "",
        status: editData.status || "AVAILABLE",
        price: editData.price || "",
        description: editData.description || "",
        mediaInput: editData.mediaInput || "",
      });
    } else {
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        status: "AVAILABLE",
        price: "",
        description: "",
        mediaInput: "",
      });
    }
  }, [editData, showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaArr = (formData.mediaInput || "")
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url)
        .map((url) => ({ url }));

      const payload = {
        body: {
          ...formData,
          price: parseFloat(formData.price),
          media: mediaArr,
        }
      };
      delete payload.body.mediaInput;

      let response, updatedListing;
      if (editData) {
        // Edit mode
        payload.body.id = editData.id; // Ensure ID is included for update
        response = await axios.post(`/api/admin/update/listing`, payload);
        updatedListing = response?.data?.body;
        if (onUpdate) onUpdate(updatedListing);
      } else {
        // Create mode
        response = await axios.post("/api/admin/create/listing", payload);
        const newListing = response?.data?.body;
        setListing((prev) => [...prev, newListing]);
        setFiltered((prev) => [...prev, newListing]);
      }
      setShowModal(false);
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        status: "AVAILABLE",
        price: "",
        description: "",
        mediaInput: "",
      });
    } catch (err) {
      console.error("Error saving listing:", err);
      alert("Failed to save listing.");
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Listing" : "Create Listing"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" value={formData.address} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" value={formData.city} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control name="country" value={formData.country} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="SOLD">SOLD</option>
              <option value="PENDING">PENDING</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Media (Image/Video URLs)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="mediaInput"
              placeholder="Enter one URL per line"
              value={formData.mediaInput}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Paste multiple image/video URLs, one per line.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {editData ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ListingModel