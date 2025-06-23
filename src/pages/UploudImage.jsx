import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function UploadImage() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("privasi");
  useEffect(() => {
    const fetchCuisine = async () => {
      try {
        const { data } = await axios.get(
          `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCuisine(data.data);
      } catch (error) {
        console.error("Failed to fetch cuisine:", error);
      }
    };
    fetchCuisine();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imgUrl", imageFile);

      await axios.patch(
        `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#F8F3D9] p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-[#504B38] mb-4">
        Upload Gambar untuk: {cuisine.name}
      </h1>
      {cuisine.imgUrl && (
        <img
          src={cuisine.imgUrl}
          alt="Current"
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="block w-full text-sm text-[#504B38] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#B9B28A] file:text-white hover:file:bg-[#A69E7C]"
        />

        <button
          type="submit"
          className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-6 py-2 rounded-lg transition duration-200"
        >
          Upload Gambar
        </button>
      </form>
    </div>
  );
}

export default UploadImage;
