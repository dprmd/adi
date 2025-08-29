import { createHashRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import AlokasiPemasukan from "./pages/AlokasiPemasukan";
import { Outlet } from "react-router";
import { createBrowserHistory } from "history";
import PerhitunganProfit from "./pages/PerhitunganProfit";
import PerhitunganKomisiKotor from "./pages/PerhitunganKomisiKotor";
import UbahInformasiProduk from "./pages/UbahInformasiProduk";

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
      { path: "PerhitunganProfit", Component: PerhitunganProfit },
      { path: "AlokasiPemasukan", Component: AlokasiPemasukan },
      {
        path: "PerhitunganKomisiKotor",
        Component: PerhitunganKomisiKotor,
        children: [
          { path: "UbahInformasiProduk", Component: UbahInformasiProduk },
        ],
      },
    ],
  },
  { history },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
