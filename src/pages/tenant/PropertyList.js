import React, { useEffect, useState } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("https://mernback-7k5e.onrender.com/api/properties");
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (property) => {
    setSelectedProperty(property); // Set the selected property to be shown in the modal
  };

  const handleCloseModal = () => {
    setSelectedProperty(null); // Close the modal by setting the selected property to null
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>𝑭𝑰𝑵𝑫 𝒀𝑶𝑼𝑹 𝑺𝑷𝑨𝑪𝑬!</h2><br></br><br></br>

      <div style={styles.propertyGrid}>
        {properties
          .filter((property) => property.status === "available") // Only show available properties
          .map((property) => (
            <div key={property._id} style={styles.propertyCard}>
              <div style={styles.cardHeader}>
                <div style={styles.houseCircle}>{property.houseNumber}</div>
                <p style={styles.propertyDetails}>
                  {property.rooms} BHK | Rent: ₹{property.rent}/month
                </p>
              </div>
              <button
                onClick={() => handleViewDetails(property)}
                style={styles.viewDetailsButton}
              >
                View Details
              </button>
            </div>
          ))}
      </div>

      {selectedProperty && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>RENT DETAILS</h3>
            <p><strong>House Number:</strong> {selectedProperty.houseNumber}</p>
            <p><strong>Floor:</strong> {selectedProperty.floor || "N/A"}</p>
            <p><strong>Rent:</strong> ₹{selectedProperty.rent}/month</p>
            {/* Display contact details if available */}
            <p><strong>Contact Number:</strong> {selectedProperty.contact || "Not Provided"}</p>
            <br></br><h3>Interested? Contact Now!</h3>
            <button onClick={handleCloseModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/002/331/442/small/watercolor-peach-brown-background-for-paper-design-vector.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#8C5A50", // Matches the view details button color
    borderRadius: "8px",
    width: "100%",
    height:"565px",
    maxWidth: "1286px",
    margin: "0 auto",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#8C5A50",
    marginBottom: "20px",
    fontSize: "2.5rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  propertyCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
  },
  cardHeader: {
    marginBottom: "15px",
  },
  houseCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#8C5A50",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: "bold",
    margin: "0 auto 10px",
  },
  propertyDetails: {
    fontSize: "1.2rem",
    color: "#333",
  },
  viewDetailsButton: {
    backgroundColor: "#8C5A50",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    backgroundColor: "#8C5A50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "1rem",
  },
};

export default PropertyList;
