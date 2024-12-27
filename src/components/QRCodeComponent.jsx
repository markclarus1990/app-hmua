// QRCodeComponent.jsx
import React from "react";
import ReactQRCode from "react-qr-code"; // Using react-qr-code package

const QRCodeComponent = ({ value, size = 256 }) => {
  return <ReactQRCode value={value} size={size} />;
};

export default QRCodeComponent;
