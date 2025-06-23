import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import ListUtama from "../pages/ListUtama";
import CreateCuisine from "../pages/CreateCuisine";
import DetailCuisine from "../pages/DetailCuisine";
import EditCuisine from "../pages/EditCuisine";
import HomePage from "../pub/HomePage";
import Detail from "../pub/Detail";
import UploadImage from "../pages/UploudImage";

export const router = createBrowserRouter([
  {
    path: "/pub/cuisines",
    element: <HomePage />,
  },
  {
    path: "/pub/cuisines/:id",
    element: <Detail />,
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.privasi) {
        return redirect("/cuisines");
      }
      return null;
    },
    element: <Login />,
  },
  {
    path: "/",
    loader: () => {
      if (!localStorage.privasi) {
        return redirect("/login");
      }
      return null;
    },
    element: <RootLayout />,
    children: [
      {
        path: "/cuisines",
        element: <ListUtama />,
      },
      {
        path: "/cuisines/add",
        element: <CreateCuisine />,
      },
      {
        path: "/cuisines/:id",
        element: <DetailCuisine />,
      },
      {
        path: "/cuisines/:id/edit",
        element: <EditCuisine />,
      },
      {
        path: "/cuisines/:id/image",
        element: <UploadImage />,
      },
    ],
  },
]);
