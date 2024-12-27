import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("asdasdasd", sessionStorage.getItem("auth"));
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/admin");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}
