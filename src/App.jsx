import { createHashRouter, RouterProvider } from "react-router";
import GaransiHargaTerbaik from "./pages/GaransiHargaTerbaik";
import Home from "./pages/Home";
import AlokasiPemasukan from "./pages/AlokasiPemasukan";
import { Outlet } from "react-router";
import { createBrowserHistory } from "history";

const Root = () => {
  return <Outlet></Outlet>;
};

const history = createBrowserHistory({
  window,
  basename: "/adi",
});

const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "GaransiHargaTerbaik", Component: GaransiHargaTerbaik },
      { path: "AlokasiPemasukan", Component: AlokasiPemasukan },
    ],
  },
  { history },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
