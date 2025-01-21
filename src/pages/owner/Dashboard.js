import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://mernback-7k5e.onrender.com//api/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    navigate("/owner/property-form"); // Redirect to the add property page
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedProperty = await axios.put(
        `https://mernback-7k5e.onrender.com/api/properties/${id}/status`,  // New URL format
        { newStatus: status }  // Send the new status in the request body
      );
  
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === id ? updatedProperty.data : property
        )
      );
  
      if (status === "rented") {
        setTimeout(() => {
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property._id !== id)
          );
        }, 60000); // 1 minute (60,000 ms) delay
      }
    } catch (err) {
      console.error("Error updating property status:", err);
    }
  };
  
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Owner Dashboard</h2>
      <button onClick={handleAddProperty} style={styles.addButton}>
        <FaEdit style={{ marginRight: "8px" }} />
        Add Property
      </button>

      <div style={styles.propertyOverview}>
        <div style={styles.statCard}>
          <h3 style={styles.statTitle}>Available Properties</h3>
          <p style={styles.statValue}>
            {properties.filter((p) => p.status === "available").length}
          </p>
        </div>
      </div>

      <div style={styles.propertyGrid}>
        {properties
          .filter((property) => property.status === "available")
          .map((property) => (
            <div key={property._id} style={styles.propertyCard}>
              <div
                style={{
                  ...styles.houseNumberCircle,
                  backgroundColor: "#8C5A50", // Custom color (non-green)
                }}
              >
                {property.houseNumber}
              </div>
              <div style={styles.propertyDetails}>
                <h4 style={styles.propertyTitle}>
                  {property.rooms} BHK | {property.rent} /month
                </h4>
                <div style={styles.cardFooter}>
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        property._id,
                        property.status === "available" ? "rented" : "available"
                      )
                    }
                    style={styles.statusButton}
                  >
                    Mark as {property.status === "available" ? "Rented" : "Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#F5F1ED",
    backgroundImage: "url('https://img.freepik.com/free-vector/watercolor-light-peach-background_23-2150293769.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto", // Ensure full background coverage
    borderRadius: "8px",
    width: "100%",
    maxWidth: "1285px",
    margin: "0 auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontFamily: "'Dancing Script', cursive", // Calligraphy style font
    fontWeight: "700",
    color: "#8C5A50", // Stylish and bold
    marginBottom: "40px", // Increased margin
    fontSize: "48px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  addButton: {
    backgroundColor: "#8C5A50", // Color matching
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    margin: "0 auto 40px auto", // Increased space between the button and other elements
  },
  propertyOverview: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "48%",
    textAlign: "center",
  },
  statTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  statValue: {
    fontSize: "32px",
    color: "#8C5A50", // Non-green color for statistics
    fontWeight: "bold",
  },
  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  propertyCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  houseNumberCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "20px",
    marginBottom: "15px",
  },
  propertyDetails: {
    textAlign: "center",
  },
  propertyTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2F2E2C",
  },
  description: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "15px",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statusButton: {
    padding: "10px",
    backgroundColor: "#8C5A50", // Matching color (non-green)
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default OwnerDashboard;
