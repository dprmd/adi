import { createBrowserRouter, RouterProvider } from "react-router";
import GaransiHargaTerbaik from "./pages/GaransiHargaTerbaik";
import Home from "./pages/Home";
import { Outlet } from "react-router";

const Root = () => {
  return <Outlet></Outlet>;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "GaransiHargaTerbaik", Component: GaransiHargaTerbaik },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
