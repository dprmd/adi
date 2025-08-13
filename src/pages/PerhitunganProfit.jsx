import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const PerhitunganProfit = () => {
  // State
  const navigate = useNavigate();
  const [perubahanAdminShopeePersen, setPerubahanAdminShopeePersen] =
    useState("");
  const [ubahAdminShopeePersen, setUbahAdminShopeePercent] = useState(false);

  // Admin Shopee
  const biayaPerPesanan = 1250;
  const biayaPengiriman = 350;
  const [adminShopeePercent, setAdminShopeePercent] = useState(9);

  // Input
  const [hargaJual, setHargaJual] = useState("");
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
      (adminShopeePercent / 100) * Number(hargaJual) +
      biayaPerPesanan +
      biayaPengiriman;
    const hargaFinal = Number(hargaJual) - totalAdmin - Number(voucher);
    const totalKomisiAMSDidapat = (komisiAMS / 100) * hargaFinal;

    setTotalKomisiSaya(hargaFinal);
    setTotalAdminShopee(totalAdmin);
    setTotalKomisiAMS(totalKomisiAMSDidapat);
    setTotalKomisiSayaDipotongAMS(hargaFinal - totalKomisiAMSDidapat);
  };

  useEffect(() => {
    // localStorage Checker
    if (localStorage.getItem("adminShopeePercent")) {
      const adminShopee = localStorage.getItem("adminShopeePercent");
      setAdminShopeePercent(Number(adminShopee));
      setPerubahanAdminShopeePersen(adminShopee);
    } else {
      localStorage.setItem("adminShopeePercent", "9");
    }
  }, []);

  // Html Css Data
  const keterangan = [
    { label: "Admin Shopee", value: `${adminShopeePercent} %` },
    {
      label: "Biaya Per Pesanan",
      value: `Rp ${biayaPerPesanan.toLocaleString("id-ID")}`,
    },
    {
      label: "Biaya Pengiriman",
      value: `Rp ${biayaPengiriman.toLocaleString("id-ID")}`,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-y-3">
      {/* dialog ubah admin shopee percent */}
      {ubahAdminShopeePersen && (
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
          <form className="border bg-white p-4 rounded-xl w-[400px]">
            <div className="input-components flex flex-col gap-y-2">
              <label htmlFor="ubahAdminShopeePersen">
                Masukan Admin Shopee Mu
              </label>
              <input
                type="text"
                id="ubahAdminShopeePersen"
                className="border px-1"
                placeholder="Masukan Admin Shopee Kamu . . ."
                onChange={(e) => {
                  setPerubahanAdminShopeePersen(e.target.value);
                }}
              />
              <div className="flex gap-x-2 items-center">
                <button
                  className="w-full px-2 py-1 text-white rounded-md bg-red-700 hover:bg-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setUbahAdminShopeePercent(false);
                  }}
                >
                  Batal
                </button>
                <button
                  className="w-full px-2 py-1 text-white rounded-md bg-green-700 hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem(
                      "adminShopeePercent",
                      perubahanAdminShopeePersen
                    );
                    setAdminShopeePercent(Number(perubahanAdminShopeePersen));
                    setUbahAdminShopeePercent(false);
                  }}
                >
                  Ubah
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Judul */}
      <h3 className="text-center text-2xl mt-3">Perhitungan Profit Shopee</h3>

      <form className="border p-4">
        <div className="input-components w-full">
          {keterangan.map((item, index) => (
            <div className="flex justify-between">
              <span>{item.label}</span>
              <span>
                {item.value}
                {index === 0 && (
                  <i
                    class="bi bi-pencil ml-2 hover:bg-black hover:text-white p-1 rounded-md"
                    onClick={() => {
                      setUbahAdminShopeePercent(true);
                    }}
                  ></i>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Harga Program */}
        <div className="input-components">
          {/* Harga Jual */}
          <label htmlFor="HargaJual">Harga Jual : </label>
          <input
            type="number"
            id="HargaJual"
            value={hargaJual}
            placeholder="Isi Harga Program . . ."
            onChange={(e) => {
              setHargaJual(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setHargaJual("");
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

        {/* Button */}
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

export default PerhitunganProfit;
