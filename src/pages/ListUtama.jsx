import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function ListUtama() {
  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    const getDataCuisine = async () => {
      const token = localStorage.getItem("privasi");
      // console.log(token);

      try {
        const { data } = await axios.get(
          "https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCuisine(data.data.slice(0, 10));
      } catch (error) {
        console.error(
          "Error fetching cuisine:",
          error.response?.data || error.message
        );
      }
    };
    getDataCuisine();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("privasi");
    try {
      await axios.delete(
        `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCuisine((el) => el.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#F8F3D9] px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#504B38] flex justify-center">
            Daftar Menu
          </h2>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#B9B28A] text-white">
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-center">Nama</th>
                <th className="px-4 py-2 text-center">Description</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            {cuisine.map((cuisine) => (
              <tbody key={cuisine.id} className="text-[#504B38]">
                <tr className="border-b">
                  <td className="px-4 py-2">
                    <img src={cuisine.imgUrl} alt="Food" />
                  </td>
                  <td className="px-4 py-2">{cuisine.name}</td>
                  <td className="px-4 py-2">{cuisine.description}</td>
                  <td className="px-4 py-2">{cuisine.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/cuisines/${cuisine.id}`}
                        className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                      >
                        Detail
                      </Link>

                      <Link
                        to={`/cuisines/${cuisine.id}/edit`}
                        className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/cuisines/${cuisine.id}/image`}
                        className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                      >
                        Upload Img
                      </Link>

                      <button
                        onClick={() => handleDelete(cuisine.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default ListUtama;
