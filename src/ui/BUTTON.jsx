import { useNavigate } from "react-router-dom";

function BUTTON({ NS, PS, form }) {
  console.log("NS:", NS);
  console.log("PS:", PS);

  const navigate = useNavigate();

  return (
    <div className="mt-6 mb-0 flex justify-between mb-20">
      <button
        // type={PS ? `button` : `submit`}
        onClick={() => navigate(-1)}
        className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Previous
      </button>

      <button
        type={NS ? `button` : `submit`}
        onClick={() => navigate(`/app/${form}`)}
        className="px-6 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition"
      >
        Next
      </button>
    </div>
  );
}

export default BUTTON;
