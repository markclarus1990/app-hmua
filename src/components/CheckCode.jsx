import { useState } from "react";

import { Check, XCircle } from "lucide-react";

import Buttons from "../ui/Buttons";
import Inputs from "../ui/Inputs";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";

const CheckCode = ({ setModalOpen }) => {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleCheckCode = () => {
    // Simulate code validation
    const validCodes = ["1234", "5678", "ABCD"]; // Replace with your logic
    setIsValid(validCodes.includes(code));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-peach-500 to-indigo-500 p-4">
      <span onClick={() => setModalOpen(false)} className="items-end">
        ❌
      </span>
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            Check Your Code
          </h2>
          <p className="text-center text-sm text-gray-200 mb-6">
            Enter your code below to validate it
          </p>

          <div className="space-y-4">
            <Inputs
              type="text"
              placeholder="Enter code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <Buttons
              onClick={handleCheckCode}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Validate Code
            </Buttons>

            {isValid !== null && (
              <div
                className={`flex items-center justify-center mt-4 p-4 rounded-lg ${
                  isValid ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {isValid ? (
                  <>
                    <Check className="text-white w-6 h-6 mr-2" />
                    <span className="text-white font-semibold">
                      Code is valid!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-white w-6 h-6 mr-2" />
                    <span className="text-white font-semibold">
                      Code is invalid!
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckCode;
