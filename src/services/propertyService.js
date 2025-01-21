import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/api/properties";

// Fetch all properties
export const getProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching properties:", err);
  }
};

// Add a new property
export const addProperty = async (property) => {
  try {
    const response = await axios.post(API_URL, property);
    return response.data;
  } catch (err) {
    console.error("Error adding property:", err);
  }
};

// Update a property
export const updateProperty = async (id, property) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, property);
    return response.data;
  } catch (err) {
    console.error("Error updating property:", err);
  }
};

// Delete a property
export const deleteProperty = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting property:", err);
  }
};
