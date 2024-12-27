import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  user: sessionStorage.getItem("user"),
  isAuthenticated: !!sessionStorage.getItem("user"),
  pic: sessionStorage.getItem("pic"),
  data: JSON.parse(sessionStorage.getItem("data")) || {},
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        pic: action.payload.pic,
        data: action.payload.data,
      };
    case "logout":
      return { ...initialState, isAuthenticated: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [{ data, user, pic, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let logoutTimer;

    function resetTimer() {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        logout();
      }, 15 * 60 * 1000); // 15 minutes
    }

    function setupActivityListeners() {
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) =>
        window.addEventListener(event, resetTimer, { passive: true })
      );
    }

    function cleanupActivityListeners() {
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer, { passive: true })
      );
    }

    if (isAuthenticated) {
      setupActivityListeners();
      resetTimer();
    }

    return () => {
      clearTimeout(logoutTimer);
      cleanupActivityListeners();
    };
  }, [isAuthenticated]);

  function login(data) {
    const { user, pic, ...rest } = data;
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("pic", pic);
    sessionStorage.setItem("data", JSON.stringify(rest));
    dispatch({ type: "login", payload: data });
  }

  function logout() {
    sessionStorage.clear();
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ data, user, login, logout, pic, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
