import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function Detail() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  const getDetailCuisine = async () => {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`
      );
      setDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailCuisine();
  }, [id]);
  return (
    <>
      <header className="bg-[#F8F3D9] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#504B38]">
            Detail Menu Restaurant
          </h1>
          <Link
            to="/pub/cuisines"
            className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-2xl transition duration-300"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="max-w-3xl px-4 py-8 mx-auto">
        <div className="bg-[#B9B28A] rounded-2xl shadow-md overflow-hidden">
          <img
            src={detail.imgUrl}
            className="w-full h-64 object-cover"
            alt="Detail Menu"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#504B38]">{detail.name}</h2>
            <p className="text-[#504B38] mt-4">{detail.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
