import { useForm } from "react-hook-form";
import { useFormContext } from "../contexts/FormContext";
import WeddingDetails from "./WeddingDetails";
import { useNavigate } from "react-router-dom";

const Step1FormContainer = () => {
  const { setStep1Data, step1 } = useFormContext();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // On form submission
  const onSubmit = (data) => {
    console.log(data);
    setStep1Data(data);
    console.log("FROM CONTEXT", step1);
  };

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <WeddingDetails register={register} />
        {/* 
      <BUTTON
        NS={NS}
        PS={PS}
        currentStep={currentStep}
        steps={steps}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      >
        Next
      </BUTTON> */}
        <button
          onClick={() => navigate("/app/PackageSelection")}
          className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Step1FormContainer;
