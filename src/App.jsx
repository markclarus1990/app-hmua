import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FormProvider } from "./contexts/FormContext"; // Adjust path as needed
import Applayout from "./components/Applayout";
import Homepage from "./components/Homepage";
import { AnimatePresence, motion } from "framer-motion";
import Admin from "./admin/Admin";
import { ProtectedRoute } from "./contexts/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ContractSigning from "./components/ContractSigning";

// Lazy load components for code splitting
const Step1FormContainer = React.lazy(() =>
  import("./components/Step1FormContainer")
);
const Step2FormContainer = React.lazy(() =>
  import("./components/Step2FormContainer")
);
const Step3FormContainer = React.lazy(() =>
  import("./components/Step3FormContainer")
);
const Step4FormContainer = React.lazy(() =>
  import("./components/Step4FormContainer")
);
const Step6FormContainer = React.lazy(() =>
  import("./components/Step6FormContainer")
);
// const Summary = React.lazy(() => import("./components/Summary"));

import Summary from "./components/Summary";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivacyPolicy from "./components/PRIVACYPOLICY";

// Fallback loading component
const Loading = () => <div>Loading...</div>;

// Page transition animations
const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const session = useSession(); // Get session data
  const supabase = useSupabaseClient(); // Supabase client
  const navigate = useNavigate();
  useEffect(() => {
    // Function to check if the app is accessed via Messenger's browser
    function isMessengerBrowser() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return userAgent.includes("FBAN") || userAgent.includes("FBAV");
    }

    // Alert the user if they are using the Messenger browser
    if (isMessengerBrowser()) {
      alert(
        "You are using the app through the Messenger browser. For the best experience, please open it in a standard browser like Google Chrome."
      );
    }

    // Prevent refresh or navigation
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your progress might be lost.";
      return e.returnValue; // Necessary for older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Adjust based on your needs
      },
    },
  });

  return (
    <AnimatePresence mode="wait">
      <FormProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}

            <Routes location={location} key={location.pathname}>
              {/* Root/Homepage Route */}
              <Route path="/" element={<Applayout />}>
                <Route
                  path="/"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Homepage />
                    </motion.div>
                  }
                />

                {/* App Layout Route */}
                <Route path="/" element={<Homepage />} />

                <Route
                  path="/weddingDetails"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Step1FormContainer />
                    </motion.div>
                  }
                />
                <Route
                  path="/PackageSelection"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Step2FormContainer />
                    </motion.div>
                  }
                />
                <Route
                  path="/CoupleDetailsForm"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Step3FormContainer />
                    </motion.div>
                  }
                />
                <Route
                  path="/ServiceSelectionForm"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Step4FormContainer />
                    </motion.div>
                  }
                />
                <Route
                  path="/summary"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Summary />
                    </motion.div>
                  }
                />
                <Route
                  path="/packageType"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Step6FormContainer />
                    </motion.div>
                  }
                />
                <Route
                  path="/privacy&policy"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <PrivacyPolicy />
                    </motion.div>
                  }
                />

                <Route
                  path="/contract"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <ContractSigning />
                    </motion.div>
                  }
                />
              </Route>
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </FormProvider>
    </AnimatePresence>
  );
};

const App = () => {
  const clientId =
    "931880666628-5o1g8t61plfb55nqvurjka462kbdvont.apps.googleusercontent.com";
  useEffect(() => {
    // Function to check if the app is accessed via Messenger's browser
    function isMessengerBrowser() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return userAgent.includes("FBAN") || userAgent.includes("FBAV");
    }

    // Alert the user if they are using the Messenger browser
    if (isMessengerBrowser()) {
      alert(
        "You are using the app through the Messenger browser. For the best experience, please open it in a standard browser like Google Chrome."
      );
    }
  }, []);
  return (
    <FormProvider>
      <GoogleOAuthProvider
        client={
          "566323464247-a1uuf8vshtfvmvracatlvdb2bif2a4ac.apps.googleusercontent.com"
        }
      >
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </FormProvider>
  );
};

export default App;
