import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BUTTON({ NS, PS, form, selectedPackage }) {
  console.log("NS:", NS);
  console.log("PS:", PS);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedPackage);
  }, [selectedPackage]);
  return (
    <div className="flex  justify-center py-10 px-2 xs:py-2  gap-3 bg-peach-300 w-[500px] mx-auto my-auto rounded-lg mt-4 xs:w-[300px]  sm:w-[500px] md:w-[800px]">
      <button
        // type={PS ? `button` : `submit`}
        onClick={() => navigate(-1)}
        className="px-2 py-2 text-white bg-peach-600 rounded-lg hover:bg-peach-700 transition "
      >
        Previous
      </button>

      <button
        type={NS ? `button` : `submit`}
        onClick={() => navigate(`/${form}`)}
        className="px-6 py-2 text-white bg-peach-600 rounded-lg hover:bg-peach-500 transition"
      >
        Next
      </button>
    </div>
  );
}

export default BUTTON;
