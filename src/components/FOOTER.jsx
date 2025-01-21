import { useNavigate } from "react-router-dom";

// SimpleFooter.jsx
function SimpleFooter({ className }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-center items-center ${className} flex-col h-[100px]`}
    >
      <p className="text-sm">© 2025 MSYS. All Rights Reserved.</p>
      <a href="" onClick={() => navigate("/privacy&policy")}>
        Privacy Policy
      </a>
    </div>
  );
}

export default SimpleFooter;
