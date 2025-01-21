import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import WeddingDetails from "./WeddingDetails";
import { useFormContext } from "../contexts/FormContext";
import { toast } from "react-toastify";

const Step1FormContainer = () => {
  const { setStep1Data } = useFormContext();
  const { register, handleSubmit, formState, trigger } = useForm();
  const navigate = useNavigate();

  // On form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data); // Check the actual submitted form data
    setStep1Data(data); // Set data in context
    navigate("/PackageSelection");
  };

  // Handle "Next" button click
  const handleNext = async () => {
    const isValid = await trigger(); // Manually trigger validation for all fields

    if (!isValid) {
      toast.error("Please fill in all the fields.");
    } else {
      // Proceed to next step if all fields are valid
      handleSubmit(onSubmit)(); // Submit form
    }
  };

  return (
    <form className="flex flex-col gap-5">
      <WeddingDetails register={register} />
      <button
        type="button"
        onClick={handleNext} // Use the custom handleNext function
        className=" py-2 text-white bg-peach-600 rounded-lg hover:bg-peach-500 transition w-[500px] xs:w-[300px] md:w-[800px] mx-auto"
      >
        Next
      </button>
    </form>
  );
};

export default Step1FormContainer;
