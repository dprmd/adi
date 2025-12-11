import { createHashRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import AlokasiPemasukan from "./pages/AlokasiPemasukan";
import { createBrowserHistory } from "history";
import PerhitunganProfit from "./pages/PerhitunganProfit";

// nested route example
// import PerhitunganKomisiKotor from "./pages/PerhitunganKomisiKotor";
// import UbahInformasiProduk from "./pages/UbahInformasiProduk";

const history = createBrowserHistory({
  window,
  basename: "/adi",
});

const router = createHashRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "PerhitunganProfit", Component: PerhitunganProfit },
      { path: "AlokasiPemasukan", Component: AlokasiPemasukan },

      // Contoh nested route
      // {
      //   path: "PerhitunganKomisiKotor",
      //   children: [
      //     { index: true, Component: PerhitunganKomisiKotor },
      //     { path: "UbahInformasiProduk", Component: UbahInformasiProduk },
      //   ],
      // },
    ],
  },
  { history },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
