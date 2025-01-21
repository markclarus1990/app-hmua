import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  "https://kcvranbgzvrodkibapem.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdnJhbmJnenZyb2RraWJhcGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjAwODksImV4cCI6MjA1MDQ5NjA4OX0.mSekUwD18zeKesfxSpFv4SmtfMR3szHNsPGKRUQjK2k"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
      <ToastContainer />
    </SessionContextProvider>
  </StrictMode>
);
