import { useState } from "react";

import { Check, XCircle } from "lucide-react";

import Buttons from "../ui/Buttons";
import Inputs from "../ui/Inputs";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";

const CheckCode = ({
  setModalOpen,
  codeInput,
  setCodeInput,
  handleCode,
  selectedBook,
}) => {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleCheckCode = () => {
    // Simulate code validation
    const validCodes = ["1234", "5678", "ABCD"]; // Replace with your logic
    setIsValid(validCodes.includes(code));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[150px] bg-gradient-to-br from-peach-500 to-indigo-500 p-4 rounded-lg">
      <span onClick={() => setModalOpen(false)} className="items-end">
        ❌
      </span>
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center text-white">
            Check Your Code
          </h2>
          <p className="text-center text-lg text-peach-600 mb-6">
            Enter your code below
          </p>

          <div className="space-y-1">
            <Inputs
              type="text"
              placeholder="GHMUA-XXXXX"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-peach-500 focus:outline-none"
            />

            <Buttons
              onClick={handleCode}
              className="w-full py-2 bg-peach-600 hover:bg-peach-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Check Booking
            </Buttons>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckCode;
