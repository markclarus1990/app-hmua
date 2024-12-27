import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-peach-600 via-peach-400 to-peach-600 text-black p-8">
      <div className="max-w-3xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Applayout;
