import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

function EditCuisine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formAdd, setFormAdd] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    stock: "",
    categoryId: "",
  });

  const handleChange = (fieldName, event) => {
    let value = event.target.value;
    if (["price", "stock", "categoryId"].includes(fieldName)) {
      value = +value;
    }
    setFormAdd((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    // Fetch kategori
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("privasi");
        const { data } = await axios.get(
          "https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(data.data);
      } catch (err) {
        console.error("Gagal ambil kategori", err);
      }
    };

    // Fetch detail cuisine by id
    const fetchCuisineDetail = async () => {
      try {
        const token = localStorage.getItem("privasi");
        const { data } = await axios.get(
          `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // setFormAdd(data.data);
        setFormAdd({
          name: data.data.name ?? "",
          description: data.data.description ?? "",
          price: data.data.price ?? "",
          imgUrl: data.data.imgUrl ?? "",
          stock: data.data.stock ?? "",
          categoryId: data.data.categoryId ?? "",
        });
        console.log("data.data:", data.data);
      } catch (err) {
        Swal.fire("Error", "Data tidak ditemukan", "error");
        navigate("/cuisines");
      }
    };

    fetchCategories();
    fetchCuisineDetail();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("privasi");
      const { data } = await axios.put(
        `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`,
        formAdd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire("Success", "Cuisine berhasil diupdate!", "success").then(() => {
        navigate("/cuisines");
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Gagal update", "error");
    }
  };

  return (
    <div className="min-h-screen h-full flex items-center justify-center bg-[#F8F3D9] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#EBE5C2] p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#504B38]">
          Edit Cuisine
        </h2>

        {["name", "description", "price", "imgUrl", "stock"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-[#504B38] font-medium mb-1 capitalize"
            >
              {field}
            </label>
            <input
              type={["price", "stock"].includes(field) ? "number" : "text"}
              name={field}
              value={formAdd[field] || ""}
              onChange={(e) => handleChange(field, e)}
              className="w-full px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9B28A]"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="categoryId"
            className="block text-[#504B38] font-medium mb-1"
          >
            Category
          </label>
          <select
            name="categoryId"
            value={formAdd.categoryId || ""}
            onChange={(e) => handleChange("categoryId", e)}
            className="w-full px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9B28A]"
          >
            <option value="">--- Pilih Category ---</option>
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B9B28A] text-white py-2 rounded-lg hover:bg-[#A69E7C] transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCuisine;
