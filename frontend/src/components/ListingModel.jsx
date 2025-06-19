import React , {useState} from 'react'
import {Modal, Form, Button} from "react-bootstrap";
 
const ListingModel = ({showModal, setShowModal}) => {

      const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        status: "AVAILABLE",
        price: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleCreateListing = async (e) => {
        e.preventDefault();
        try {
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            dateTimePosted: new Date(),
            dateTimeUpdated: new Date(),
            media: [] // placeholder for now
        };

        const response = await axios.post("/api/listings", payload);
        const newListing = response?.data?.body;

        setListing((prev) => [...prev, newListing]);
        setFiltered((prev) => [...prev, newListing]);
        setShowModal(false);
        setFormData({
            name: "",
            address: "",
            city: "",
            country: "",
            status: "AVAILABLE",
            price: "",
            description: "",
        });
        } catch (err) {
        console.error("Error creating listing:", err);
        alert("Failed to create listing.");
        }
    };


  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleCreateListing}>
          <Modal.Header closeButton>
            <Modal.Title>Create Listing</Modal.Title>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default ListingModel