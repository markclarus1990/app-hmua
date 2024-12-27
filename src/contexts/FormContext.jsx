// src/contexts/FormContext.js
import { createContext, useContext, useReducer } from "react";

// Create the FormContext
export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const initialState = {
    step1: {},
    step2: "",
    step3: {},
    step6: "",
    step7: {},
    homeScreen: true,
    limitedpax: 0,

    currentStep: 1,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "step1":
        return {
          ...state,
          step1: action.payload,
          currentStep: state.currentStep + 1,
          homeScreen: false,
        };
      case "step2":
        return {
          ...state,
          step2: action.payload,
          currentStep: state.currentStep + 1,
        };
      case "step3":
        return {
          ...state,
          step3: action.payload,
          currentStep: state.currentStep + 1,
        };

      case "step6":
        return {
          ...state,
          step6: action.payload,
          // currentStep: state.currentStep + 1,
        };
      case "step7":
        return {
          ...state,
          step7: action.payload,
          currentStep: state.currentStep + 1,
        };

      case "book":
        return {
          ...state,
          homeScreen: false,
        };
      case "limited":
        return { ...state, limitedpax: action.payload };
      case "nextStep":
        return { ...state, currentStep: state.currentStep + 1 };
      case "prevStep":
        return { ...state, currentStep: state.currentStep - 1 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Dispatch functions
  const setStep1Data = (data) => dispatch({ type: "step1", payload: data });
  const setStep2Data = (data) => dispatch({ type: "step2", payload: data });
  const setStep3Data = (data) => dispatch({ type: "step3", payload: data });
  const setStep6Data = (data) => dispatch({ type: "step6", payload: data });
  const setStep7Data = (data) => dispatch({ type: "step7", payload: data });
  const setlimited = (data) => dispatch({ type: "limited", payload: data });

  const Booking = () => dispatch({ type: "book" });

  function NS() {
    dispatch({ type: "nextStep" });
    // console.log(state.currentStep);
  }

  function PS() {
    dispatch({ type: "prevStep" });
    // console.log(state.currentStep);
  }

  return (
    <FormContext.Provider
      value={{
        step1: state.step1,
        step2: state.step2,
        step3: state.step3,
        setStep1Data,
        setStep2Data,
        setStep3Data,
        setStep6Data,
        setStep7Data,
        Booking,
        setlimited,
        limitedpax: state.limitedpax,
        step6: state.step6,
        step7: state.step7,
        NS,
        PS,
        homeScreen: state.homeScreen,
        currentStep: state.currentStep, // Add currentStep to context if needed
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use context
export const useFormContext = () => useContext(FormContext);
