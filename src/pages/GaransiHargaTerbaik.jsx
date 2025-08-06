import { useState } from "react";
import { useNavigate } from "react-router";

const GaransiHargaTerbaik = () => {
  // State
  const navigate = useNavigate();

  // Input
  const biayaPerPesanan = 1250;
  const [adminShopeePercent, setAdminShopeePercent] = useState(9);
  const [hargaGaransiHargaTerbaik, setHargaGaransiHargaTerbaik] = useState("");
  const [voucher, setVoucher] = useState("");
  const [komisiAMS, setKomisiAMS] = useState("");

  // Output
  const [totalKomisiSaya, setTotalKomisiSaya] = useState(0);
  const [totalAdminShopee, setTotalAdminShopee] = useState(0);
  const [totalKomisiAMS, setTotalKomisiAMS] = useState(0);
  const [totalKomisiSayaDipotongAMS, setTotalKomisiSayaDipotongAMS] =
    useState(0);

  const hitung = (e) => {
    e.preventDefault();
    const totalAdmin =
      (adminShopeePercent / 100) * Number(hargaGaransiHargaTerbaik) +
      biayaPerPesanan;
    const hargaFinal =
      Number(hargaGaransiHargaTerbaik) - totalAdmin - Number(voucher);
    const totalKomisiAMSDidapat = (komisiAMS / 100) * hargaFinal;

    setTotalKomisiSaya(hargaFinal);
    setTotalAdminShopee(totalAdmin);
    setTotalKomisiAMS(totalKomisiAMSDidapat);
    setTotalKomisiSayaDipotongAMS(hargaFinal - totalKomisiAMSDidapat);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-y-3">
      <h3 className="text-center text-2xl mt-3">
        Perhitungan Garansi Harga Terbaik
      </h3>

      <form className="border p-4">
        <div className="input-components">
          <p>
            Admin Shopee Sebesar {adminShopeePercent} % + Biaya Per Pesanan Rp
            1.250
          </p>
        </div>

        {/* Harga Program */}
        <div className="input-components">
          <label htmlFor="HargaJual">
            Harga Program Garansi Harga Terbaik :{" "}
          </label>
          <input
            type="number"
            id="HargaJual"
            value={hargaGaransiHargaTerbaik}
            placeholder="Isi Harga Program . . ."
            onChange={(e) => {
              setHargaGaransiHargaTerbaik(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setHargaGaransiHargaTerbaik("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Voucher */}
        <div className="input-components">
          <label htmlFor="voucher">Voucher (Jika Ada) : </label>
          <input
            type="number"
            id="voucher"
            value={voucher}
            placeholder="Masukan Voucher . . ."
            onChange={(e) => {
              setVoucher(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setVoucher("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Persenan Komisi AMS */}
        <div className="input-components">
          <label htmlFor="AMS">Komisi AMS : </label>
          <input
            type="number"
            id="AMS"
            value={komisiAMS}
            placeholder="Komisi Ams % . . ."
            onChange={(e) => {
              setKomisiAMS(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setKomisiAMS("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>
        <div className="px-3 flex gap-x-2 mt-4">
          <button
            className="bg-red-600 hover:bg-red-400 px-2 py-1 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Kembali
          </button>
          <button
            onClick={hitung}
            className="bg-green-600 hover:bg-green-400 px-2 py-1 rounded-md"
          >
            Kalkulasikan
          </button>
        </div>
      </form>

      <div className="border p-4">
        <p>
          Admin Shopee Sebesar :{" "}
          <b>{Math.floor(totalAdminShopee).toLocaleString("id-ID")}</b>
        </p>
        <p>
          Komisi Affiliate Sebesar :{" "}
          <b>{Math.floor(totalKomisiAMS).toLocaleString("id-ID")}</b>
        </p>
        <p>
          Penghasilan Akhir :{" "}
          <b>{Math.floor(totalKomisiSaya).toLocaleString("id-ID")}</b>
        </p>
        <p>
          Penghasilan Setelah Dipotong Affiliate :{" "}
          <b>
            {Math.floor(totalKomisiSayaDipotongAMS).toLocaleString("id-ID")}
          </b>
        </p>
      </div>
    </div>
  );
};

export default GaransiHargaTerbaik;
