// QRCodePage.js (Frontend)
import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // Using Canvas-based QR code (or you can use QRCodeSVG)

const QRCodePage = () => {
  const qrUrl = "https://mernfront-l567.onrender.com"; // Replace this with your actual tenant page URL if needed

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Scan this QR Code to View Available Properties:</h2>
      <div style={styles.qrCodeSection}>
        <QRCodeCanvas value={qrUrl} size={256} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  qrCodeSection: {
    marginTop: "20px",
  },
};

export default QRCodePage;
