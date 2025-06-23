import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("privasi");
    navigate("/login");
  };

  return (
    <>
      <header className="bg-[#F8F3D9] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#504B38]">
            Restaurant App
          </h1>
          <div className="flex gap-3">
            <Link
              to={"/cuisines/add"}
              className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Add Food
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
