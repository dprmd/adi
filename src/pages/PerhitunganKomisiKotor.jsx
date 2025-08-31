import { Link } from "react-router";

const PerhitunganKomisiKotor = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="border border-slate-400 px-3 py-2 text-center">
        <h1 className="text-xl font-bold">Perhitungan Komisi Kotor</h1>
        <span className="text-sm">
          Anda bisa mengubah Informasi Produk{" "}
          <Link to="UbahInformasiProduk" className="text-slate-400">
            Di Sini
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PerhitunganKomisiKotor;
