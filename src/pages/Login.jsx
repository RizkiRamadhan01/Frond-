import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formLogin = async (event) => {
    event.preventDefault();
    // console.log("email, password", email, password);
    try {
      const { data } = await axios.post(
        "https://h8-phase2-gc.vercel.app/apis/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("ini token", data.data.access_token);
      console.log(data);
      localStorage.setItem("privasi", data.data.access_token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/cuisines");
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg=[#F8F3D9] px-4">
        <form
          className="bg-auto p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
          onSubmit={formLogin}
        >
          <h2 className="text-2xl font-bold text-center text-[#504B38]">
            Login
          </h2>
          <div>
            <label
              htmlFor="title"
              className="block text-[#504B38] font-medium mb-1"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className="w-full px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9B28A]"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-[#504B38] font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="masukan password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className="w-full px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B9B28A]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#B9B28A] text-white py-2 rounded-lg hover:bg-[#A69E7C] transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
