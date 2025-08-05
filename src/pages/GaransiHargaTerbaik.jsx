import { useState } from "react";

const GaransiHargaTerbaik = () => {
  const biayaPerPesanan = 1250;
  const [adminShopeePercent, setAdminShopeePercent] = useState(9);
  const [hargaJual, setHargaJual] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [AMS, setAMS] = useState(0);

  // Hasil
  const [komisiFinal, setKomisiFinal] = useState(0);
  const [adminShopeeFinal, setAdminShopeeFinal] = useState(0);
  const [komisiAMSFinal, setKomisiAMSFinal] = useState(0);
  const [komisiFinalAfterAMS, setKomisiFinalAfterAMS] = useState(0);

  const calculate = (e) => {
    e.preventDefault();
    const totalAdmin = (adminShopeePercent / 100) * hargaJual + biayaPerPesanan;
    const hargaFinal = hargaJual - totalAdmin - voucher;
    const komisiAMS = (AMS / 100) * hargaFinal;

    setKomisiFinal(hargaFinal);
    setAdminShopeeFinal(totalAdmin);
    setKomisiAMSFinal(komisiAMS);
    setKomisiFinalAfterAMS(hargaFinal - komisiAMS);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-y-3">
      <h3 className="text-center text-2xl my-4">
        Perhitungan Garansi Harga Terbaik
      </h3>

      <form className="border p-4">
        <div className="input-components">
          <p>
            Admin Shopee Sebesar {adminShopeePercent} % + Biaya Per Pesanan Rp
            1.250
          </p>
        </div>
        <div className="input-components">
          <label htmlFor="HargaJual">
            Harga Program Garansi Harga Terbaik :{" "}
          </label>
          <input
            type="number"
            id="HargaJual"
            defaultValue={hargaJual}
            onChange={(e) => {
              setHargaJual(e.target.value);
            }}
          />
        </div>
        <div className="input-components">
          <label htmlFor="voucher">Voucher (Jika Ada) : </label>
          <input
            type="number"
            id="voucher"
            defaultValue={voucher}
            onChange={(e) => {
              setVoucher(e.target.value);
            }}
          />
        </div>
        <div className="input-components">
          <label htmlFor="AMS">Komisi AMS : </label>
          <input
            type="number"
            id="AMS"
            defaultValue={AMS}
            onChange={(e) => {
              setAMS(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={calculate}
            className="bg-green-600 hover:bg-green-500 px-2 py-1 rounded-md block mx-auto mt-3"
          >
            Kalkulasikan
          </button>
        </div>
      </form>

      <div className="border p-4">
        <p>Admin Shopee Sebesar : {adminShopeeFinal.toLocaleString("id-ID")}</p>
        <p>
          Komisi Affiliate Sebesar : {komisiAMSFinal.toLocaleString("id-ID")}
        </p>
        <p>Penghasilan Akhir : {komisiFinal.toLocaleString("id-ID")}</p>
        <p>
          Penghasilan Setelah Dipotong Affiliate :{" "}
          {komisiFinalAfterAMS.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default GaransiHargaTerbaik;
