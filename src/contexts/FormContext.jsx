// src/contexts/FormContext.js
import { createContext, useContext, useEffect, useReducer } from "react";
import { getPrice } from "../services/price";

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
    signat: "",
    additional: 0,
    currentStep: 1,
    code: "",
    booking_id: "",
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

      case "signature":
        return {
          ...state,
          signat: action.payload,
        };

      case "additional":
        return {
          ...state,
          additional: Number(action?.payload),
        };
      case "code":
        return {
          ...state,
          code: action.payload,
        };
      case "booking_id":
        return {
          ...state,
          booking_id: action.payload,
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
  // const setCode = (data) => dispatch({ type: "code", payload: data }console.log("asd"));

  function setCode(data) {
    console.log("FROM CONTEEXT", data);
    dispatch({ type: "code", payload: data });
    console.log("FROM CONTEEXT", state.code);
  }

  function setBookingId(data) {
    dispatch({ type: "booking_id", payload: data });
  }
  useEffect(
    function () {
      console.log("forUpload", state.signat);
    },
    [state.signat]
  );

  function setSignature(data) {
    dispatch({ type: "signature", payload: data });
    console.log("FROM CONTEXTss", state.signat);
  }
  const setAdditional = (data) =>
    dispatch({ type: "additional", payload: data });

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
        code: state.code,
        booking_id: state.booking_id,
        setBookingId,
        setCode,
        setStep1Data,
        setStep2Data,
        setStep3Data,
        setStep6Data,
        setStep7Data,
        Booking,
        setlimited,
        setSignature,
        setAdditional,
        additional: state.additional,
        signature: state.signat,
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
