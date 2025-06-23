import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
function DetailCuisine() {
  const { id } = useParams();
  const [detailCuisine, setDetailCuisine] = useState({});

  //   console.log(id);

  useEffect(() => {
    async function fetchCuisine() {
      let token = localStorage.getItem("privasi");
      try {
        const { data } = await axios.get(
          `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetailCuisine(data.data);
      } catch (err) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data.error || err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    fetchCuisine();
  }, [id]);

  return (
    <>
      <div className="fixed inset-0 bg-[#B9B28A] flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
          <h3 className="text-xl font-semibold text-[#504B38] mb-4 flex justify-center">
            Detail Menu
          </h3>
          <img
            src={detailCuisine.imgUrl}
            alt="Detail"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <p className="text-lg font-semibold">{detailCuisine.name}</p>
          <p>{detailCuisine.description}</p>
          <p className="text-[#B9B28A] font-semibold">
            Rp {detailCuisine.price}
          </p>
          <div className="flex justify-center">
            <Link
              to={"/cuisines"}
              className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-6 py-2 rounded-2xl transition duration-200"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCuisine;
