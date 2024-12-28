import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function SignatureComponent({ onSave, signature, setSignature, accepted }) {
  const sigCanvas = useRef(null);

  // Function to clear the canvas
  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  // Function to save the signature as an image
  const saveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const signatureDataURL = sigCanvas.current.toDataURL("image/png");
      onSave(signatureDataURL); // Pass the signature data back to parent
      setSignature(signatureDataURL);
    } else {
      alert("Please provide a signature before saving.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-700">Client Signature</h3>
      <div className="border-2 border-gray-300 rounded-md w-full max-w-md h-48 flex justify-center items-center bg-gray-50 border-solid border-black">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: "w-full h-full", // Make the canvas fill its parent div
          }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={clearSignature}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          disabled={!accepted}
          className={`px-6 py-2 text-white rounded-md shadow-lg ${
            accepted
              ? "bg-peach-500 hover:bg-peach-600 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Accept and Submit
        </button>
      </div>
    </div>
  );
}

export default SignatureComponent;
