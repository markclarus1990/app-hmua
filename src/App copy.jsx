import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Homepage from "./components/Homepage";
import Step1FormContainer from "./components/Step1FormContainer"; // Assuming you have this component
import Step2FormContainer from "./components/Step2FormContainer"; // Step2 component
import Step3FormContainer from "./components/Step3FormContainer"; // Step3 component
import Step4FormContainer from "./components/Step4FormContainer"; // Step4 component
import Step5FormContainer from "./components/Step5FormContainer"; // Add more steps if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />{" "}
        {/* Use element instead of component */}
        <Route path="/step1" element={<Step1FormContainer />} />
        <Route path="/step2" element={<Step2FormContainer />} />
        <Route path="/step3" element={<Step3FormContainer />} />
        <Route path="/step4" element={<Step4FormContainer />} />
        <Route path="/step5" element={<Step5FormContainer />} />
        {/* Add more steps as necessary */}
      </Routes>
    </Router>
  );
};

export default App;

<div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-400 to-violet-500 text-white p-8">
  <div className="max-w-3xl mx-auto">
    {/* Dynamically render the step based on currentStep */}
    {steps[currentStep - 1]}
  </div>
</div>;
