import athena from "/athena.png";
import aphrodite from "/aphrodite.png";

import hera from "/hera.png";

const PremiumPackagesDetails = ({
  onSelectPackage,
  setIsPackageSelected,
  pricing,
}) => {
  function handleClick(data) {
    onSelectPackage(data);
    setIsPackageSelected(true);
  }
  const athenaP = pricing?.find((item) => item.name === "Athena");
  const aphroditeP = pricing?.find((item) => item.name === "Aphrodite");
  const heraP = pricing?.find((item) => item.name === "Hera");

  function convert(price) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price); // Return the formatted value
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">
        Premium Packages
      </h2>

      <div
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 cursor-pointer hover:shadow-xl flex gap-10"
        onClick={() => handleClick("ATHENA")} // Pass the selected package type
      >
        <div>
          <h3 className="text-xl font-bold text-pink-600">
            ATHENA:
            {convert(Number(athenaP.price))} ONLY
          </h3>
          <ul className="list-none pl-5 text-lg text-purple-600">
            <li dangerouslySetInnerHTML={{ __html: athenaP.description }}></li>
          </ul>
        </div>
        <figure className="bg-white shadow-lg rounded-[25px] p-2 flex items-center justify-center h-25 w-25 opacity-[0.8]">
          <img src={athena} alt="Athena" className="h-20 w-20 rounded-full" />
        </figure>
      </div>

      <div
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 cursor-pointer hover:shadow-xl flex gap-10 opacity-[0.8]"
        onClick={() => handleClick("HERA")} // Pass the selected package type
      >
        <div>
          <h3 className="text-xl font-bold text-pink-600">
            HERA: {convert(heraP.price)} ONLY
          </h3>
          <ul className="list-none pl-5 text-lg text-purple-600">
            <li dangerouslySetInnerHTML={{ __html: heraP.description }}></li>
          </ul>
        </div>
        <figure className="bg-white shadow-lg rounded-[25px] p-2 flex items-center justify-center h-25 w-25 opacity-[0.8]">
          <img src={hera} alt="hera" className="h-20 w-20 rounded-full" />
        </figure>
      </div>

      <div
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 cursor-pointer hover:shadow-xl flex gap-10 opacity-[0.8]"
        onClick={() => handleClick("APHRODITE")} // Pass the selected package type
      >
        <div>
          <h3 className="text-xl font-bold text-pink-600">
            APHRODITE: {convert(aphroditeP.price)} ONLY
          </h3>
          <ul className="list-none pl-5 text-lg text-purple-600">
            <li
              dangerouslySetInnerHTML={{ __html: aphroditeP.description }}
            ></li>
          </ul>
        </div>
        <figure className="bg-white shadow-lg rounded-[25px] p-2 flex items-center justify-center h-25 w-25">
          <img
            src={aphrodite}
            alt="aphrodite"
            className="h-20 w-20 rounded-full"
          />
        </figure>
      </div>
    </div>
  );
};

export default PremiumPackagesDetails;
