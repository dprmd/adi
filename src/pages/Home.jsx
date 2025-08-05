import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h3 className="text-center text-3xl my-4">Hallo Selamat Datang 😄</h3>
      <ul className="text-center flex flex-col gap-y-6 justify-center">
        <li>
          <Link
            to="GaransiHargaTerbaik"
            className="bg-green-400 text-black px-4 py-2 rounded-xl hover:bg-green-300"
          >
            Tools Garansi Harga Terbaik
          </Link>
        </li>
        <li>
          <Link
            to="AlokasiPemasukan"
            className="bg-green-400 text-black px-4 py-2 rounded-xl hover:bg-green-300"
          >
            Alokasi Pemasukan
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
