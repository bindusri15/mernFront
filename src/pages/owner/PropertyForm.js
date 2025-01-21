import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyForm = ({ propertyId }) => {
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [rooms, setRooms] = useState("");
  const [rent, setRent] = useState("");
  const [isUpdate, setIsUpdate] = useState(false); // State to track if it's an update or new property
  const navigate = useNavigate();

  useEffect(() => {
    // If the propertyId is passed as a prop, we assume it's an update
    if (propertyId) {
      setIsUpdate(true);
      axios
        .get(`https://mernback-7k5e.onrender.com/api/properties/${propertyId}`)
        .then((response) => {
          const property = response.data;
          setHouseNumber(property.houseNumber);
          setFloor(property.floor);
          setRooms(property.rooms);
          setRent(property.rent);
        })
        .catch((err) => console.error("Error fetching property data:", err));
    }
  }, [propertyId]);

  const handleSubmit = async () => {
    const propertyData = {
      rent, // Only updating rent here
    };
  
    try {
      // Check if it's an update (if propertyId is passed)
      const response = await axios.put(
        `https://mernback-7k5e.onrender.com/api/properties/${houseNumber}`, // Use PUT for update based on houseNumber
        propertyData
      );
  
      console.log("Property updated:", response.data);
      navigate("/owner/Dashboard"); // Redirect to the dashboard after submission
    } catch (err) {
      console.error("Error submitting property:", err);
      alert("Error submitting property. Please try again.");
    }
  };
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>{isUpdate ? "Update Your Property" : "Add Your Space"}</h2>

        <label style={styles.label}>House Number</label>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Floor</label>
        <input
          type="text"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Rooms</label>
        <input
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Rent</label>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: 'url("https://img.freepik.com/free-vector/watercolor-light-peach-background_23-2150293769.jpg")', // Add your background image URL here
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "2rem",
    backgroundColor: "rgba(245, 241, 237, 0.8)", // Semi-transparent background for form
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive", // Stylish cursive font
    color: "#2F2E2C",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#2F2E2C",
    marginBottom: "0.5rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#2F2E2C",
  },
  submitButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#8C5A50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default PropertyForm;
