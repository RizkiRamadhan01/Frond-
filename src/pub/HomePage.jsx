import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

function HomePage() {
  const [cuisines, setCuisines] = useState([]);
  const [search, setSearch] = useState("");

  const getPubCuisines = async () => {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines?limit=12&q=${search}`
      );
      setCuisines(data.data.query.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPubCuisines();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    getPubCuisines();
  }

  return (
    <>
      <section>
        <div className="p-20 flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl text-[#B9B28A]">
            Selamat Datang Di Restaurant !
          </h1>
          <p className="mt-6 text-xl text-[#B9B28A]">
            Berbagai macam rasa yang siap untuk dinikmati
          </p>
          <div className="mt-6">
            <Link
              to={`/login`}
              className="bg-[#B9B28A] hover:bg-[#E5D0AC] text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/*<!-- Section 2 -->*/}
      <section>
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-3 gap-6">
            {cuisines.map((cuisine) => (
              <div
                key={cuisine.id}
                className="bg-[#B9B28A] rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={cuisine.imgUrl}
                  alt="Food"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#504B38]">
                    {cuisine.name}
                  </h3>
                  <p className="text-sm text-[#504B38]">
                    {cuisine.description}
                  </p>
                  <Link
                    to={`/pub/cuisines/${cuisine.id}`}
                    className="mt-3 flex justify-center bg-[#F8F3D9] px-4 py-2 text-sm text-[#504B38] font-medium rounded-2xl transition"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Outlet />

      {/*<!-- Search || filter || Sort-->*/}
      <section className="max-w-5xl mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* <!-- Search --> */}
          <form onSubmit={handleSearch} className="flex flex-col space-y-2">
            <input
              type="text"
              id="search"
              placeholder="Cari menu"
              onChange={(event) => setSearch(event.target.value)}
              className="px-4 py-2 rounded-lg bg-[#B9B28A] text-[#504B38] focus:outline-none focus:ring-2 focus:ring-[#504B38]"
            />
            <button
              type="submit"
              className="bg-[#F8F3D9] text-[#504B38] px-4 py-2 rounded-lg hover:bg-[#A69E7C] transition duration-300"
            >
              Search
            </button>
          </form>

          {/* <!-- Filter --> */}
          <form action="/" method="get" className="flex flex-col space-y-2">
            <select
              name="filter"
              className="px-4 py-2 rounded-lg bg-[#B9B28A] text-[#504B38] focus:outline-none focus:ring-2 focus:ring-[#504B38]"
            >
              <option value="">Filter</option>
              <option value="category">Category</option>
              <option value="cuisine">Cuisine</option>
            </select>
            <button
              type="submit"
              className="bg-[#F8F3D9] text-[#504B38] px-4 py-2 rounded-lg hover:bg-[#A69E7C] transition duration-300"
            >
              Apply
            </button>
          </form>

          {/* <!-- Sort --> */}
          <form action="/" method="get" className="flex flex-col space-y-2">
            <select
              name="sort"
              className="px-4 py-2 rounded-lg bg-[#B9B28A] text-[#504B38] focus:outline-none focus:ring-2 focus:ring-[#504B38]"
            >
              <option value="">Sort</option>
              <option value="name_asc">Nama A-Z</option>
              <option value="name_desc">Nama Z-A</option>
              <option value="price_low">Harga Termurah</option>
              <option value="price_high">Harga Termahal</option>
            </select>
            <button
              type="submit"
              className="bg-[#F8F3D9] text-[#504B38] px-4 py-2 rounded-lg hover:bg-[#A69E7C] transition duration-300"
            >
              Sort
            </button>
          </form>
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="flex gap-3">
          <button className="px-4 py-2 rounded bg-[#B9B28A] hover:bg-[#A69E7C] shadow-md transition duration-300">
            1
          </button>
          <button className="px-4 py-2 rounded bg-[#B9B28A] hover:bg-[#A69E7C] shadow-md transition duration-300">
            2
          </button>
          <button className="px-4 py-2 rounded bg-[#B9B28A] hover:bg-[#A69E7C] shadow-md transition duration-300">
            3
          </button>
        </nav>
      </div>
    </>
  );
}

export default HomePage;
