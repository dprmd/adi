import { useState } from "react";
import { useNavigate } from "react-router";

const metode = {
  kebutuhanPokok: 49,
  investasi: 30,
  keinginan: 20,
  sedekah: 1,
};

const patunganUntukEma = {
  uko: 40000,
  adi: 18000,
};

const gajiPerHari = 50000;

const kerjakah = {
  ya: "Ya, Hari Ini Kamu Kerja",
  tidak: "Tidak, Kamu Tidak Kerja Hari Ini",
};

const AlokasiPemasukan = () => {
  // State
  const navigate = useNavigate();
  const [sudahHitung, setSudahHitung] = useState(false);
  const [kerja, setKerja] = useState(true);

  // Start
  const [totalPenarikanDana, setTotalPenarikanDana] = useState("");
  const [sisaUangJajan, setSisaUangJajan] = useState("");
  const [hutangUko, setHutangUko] = useState("");
  const [komisiKotor, setKomisiKotor] = useState("");
  const [komisiBersih, setKomisiBersih] = useState(0);

  // Variables
  const [uangAdeSiska, setUangAdeSiska] = useState(0);
  const [uangEmaIki, setUangEmaIki] = useState(0);
  const [uangUntukSedekah, setUangUntukSedekah] = useState(0);
  const [uangPokok, setUangPokok] = useState(0);
  const [uangInvestasi, setUangInvestasi] = useState(0);
  const [uangJajan, setUangJajan] = useState(0);

  // Function
  const hitungSekarang = (e) => {
    e.preventDefault();

    // Hitung Total Untuk Ade Siska
    const untukAdeSiska =
      Number(totalPenarikanDana) -
      (patunganUntukEma.uko + Number(komisiKotor)) -
      hutangUko;
    if (kerja) {
      setUangAdeSiska(untukAdeSiska - gajiPerHari);
    } else {
      setUangAdeSiska(untukAdeSiska);
    }

    // Hitung Uang Untuk Ma Iki Dari Komisi Kotor
    const uangUntukMaIki = patunganUntukEma.uko + patunganUntukEma.adi;
    setUangEmaIki(uangUntukMaIki);

    // Hitung Sedekah
    const sisaKomisiSemiBersih = Number(komisiKotor) - patunganUntukEma.adi;
    const uangSedekah = Math.floor(
      (metode.sedekah / 100) * sisaKomisiSemiBersih
    );
    setUangUntukSedekah(uangSedekah);

    // Total Komisi Bersih
    const totalKomisiBersih =
      Number(komisiKotor) - (patunganUntukEma.adi + uangSedekah);
    setKomisiBersih(totalKomisiBersih);

    // Pembagian Ke Rekening Yang Berbeda
    setUangPokok(Math.floor((metode.kebutuhanPokok / 100) * totalKomisiBersih));
    setUangInvestasi(Math.floor((metode.investasi / 100) * totalKomisiBersih));
    setUangJajan(Math.floor((metode.keinginan / 100) * totalKomisiBersih));

    // Render
    setSudahHitung(true);
  };

  return (
    <div className="flex justify-center items-center flex-col py-3">
      <h1 className="text-2xl font-bold">Alokasi Pemasukan</h1>
      <form className="border w-max mx-auto mt-3 p-4">
        {/* Total Penarikan Dana */}
        <div className="input-components">
          <label className="block" htmlFor="totalPenarikanDana">
            Masukan Total Penarikan Dana :
          </label>
          <input
            type="number"
            value={totalPenarikanDana}
            onChange={(e) => {
              setTotalPenarikanDana(Number(e.target.value));
            }}
            placeholder="Isi di sini . . ."
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setTotalPenarikanDana("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Komisi Kotor */}
        <div className="input-components">
          <label className="block" htmlFor="komisiKotor">
            Masukan Komisi Kotor :
          </label>
          <input
            type="number"
            value={komisiKotor}
            onChange={(e) => {
              setKomisiKotor(Number(e.target.value));
            }}
            placeholder="Isi di sini . . ."
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setKomisiKotor("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Sisa Uang Jajan */}
        <div className="input-components">
          <label className="block" htmlFor="sisaUangJajanSaatIni">
            Masukan Sisa Uang Jajan Saat Ini :
          </label>
          <input
            type="number"
            value={sisaUangJajan}
            onChange={(e) => {
              setSisaUangJajan(Number(e.target.value));
            }}
            placeholder="Isi di sini . . ."
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSisaUangJajan("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Hutang Uko */}
        <div className="input-components">
          <label className="block" htmlFor="hutangUko">
            Hutang Uko (Jika Ada) :
          </label>
          <input
            type="number"
            value={hutangUko}
            onChange={(e) => {
              setHutangUko(Number(e.target.value));
            }}
            placeholder="Isi di sini . . ."
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setHutangUko("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        <div className="input-components">
          <button
            onClick={(e) => {
              e.preventDefault();
              setKerja(!kerja);
            }}
            className="px-2 py-1 bg-red-500 text-sm rounded-md mr-1"
          >
            Ubah
          </button>
          <span
            className={`text-sm text-white px-2 py-1 rounded-md ${
              kerja ? "bg-green-600" : "bg-red-600"
            }`}
          >
            Gajian : {kerja ? kerjakah.ya : kerjakah.tidak}
          </span>
        </div>

        {/* Tombol Navigasi */}
        <div className="input-components">
          <button
            className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-md mr-2"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Kembali
          </button>

          {/* Hitung Sekarang */}
          <button
            className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-md"
            onClick={hitungSekarang}
          >
            Hitung Sekarang
          </button>
        </div>

        {sudahHitung && (
          <div className="px-3 py-2">
            <div className="my-4">
              <b>Summary</b>
              <p>
                Total Penghasilan Dari Shopee :{" "}
                <b>{totalPenarikanDana.toLocaleString("id-ID")}</b>
              </p>
              <p>
                Setor Untuk Ade Siska :{" "}
                <b>{uangAdeSiska.toLocaleString("id-ID")}</b> (
                <span className="text-gray-400 text-sm inline-block mx-1">
                  UangAdeSiska - HutangUko {kerja ? "- Gaji Per Hari" : ""}
                </span>
                )
              </p>
              <p>
                Uang Untuk Ema Iki : <b>{uangEmaIki.toLocaleString("id-ID")}</b>
              </p>
              <p>
                Uang Untuk Sedekah :{" "}
                <b>{uangUntukSedekah.toLocaleString("id-ID")}</b>
              </p>
              <p>
                Komisi Bersih : <b>{komisiBersih.toLocaleString("id-ID")}</b>
              </p>
            </div>

            {/* Next Step */}
            <div>
              <b>Yang Dilakukan Selanjutnya</b>
              <ol className="list-decimal ml-6">
                {/* Transfer Ke Ade Siska */}
                <li>
                  Transfer Uang Ke <b>SeaBank Ade Siska</b> Sebesar{" "}
                  <b>{uangAdeSiska.toLocaleString("id-ID")}</b>
                </li>

                {/* Hutang Uko */}
                {Number(hutangUko) > 0 && (
                  <li>
                    Transfer Uang Bayar Hutang Uko Ke <b>SeaBank Haerudin</b>{" "}
                    Sebesar <b>{hutangUko.toLocaleString("id-ID")}</b>
                  </li>
                )}

                {/* Transfer Uang Pokok + Investasi + Ema Iki + Sedekah */}
                <li>
                  Transfer Uang{" "}
                  <span className="text-sm text-gray-400">
                    (Pokok + Investasi + Ema Iki + Sedekah
                    {kerja ? " + Gaji Perhari" : ""})
                  </span>{" "}
                  Ke <b>SeaBank Haerudin</b> Sebesar{" "}
                  <b>
                    {(
                      uangEmaIki +
                      uangPokok +
                      uangInvestasi +
                      uangUntukSedekah +
                      (kerja ? gajiPerHari : 0)
                    ).toLocaleString("id-ID")}
                  </b>
                </li>

                {/* Catat Pemasukan Ke Pokok */}
                <li>
                  Catat Pemasukan Uang Pokok Sebesar{" "}
                  <b>{uangPokok.toLocaleString("id-ID")}</b>
                </li>
                {kerja && (
                  <li>
                    Catat Pemasukan Uang Pokok (
                    <span className="text-gray-500 text-sm mx-1">Gaji</span>)
                    Sebesar <b>{gajiPerHari.toLocaleString("id-ID")}</b>
                  </li>
                )}
                <li>
                  Catat Pemasukan Uang Investasi Sebesar{" "}
                  <b>{uangInvestasi.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Catat Pemasukan Uang Jajan Sebesar{" "}
                  <b>{uangJajan.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Catat Pemasukan Uang Sedekah Sebesar{" "}
                  <b>{uangUntukSedekah.toLocaleString("id-ID")}</b>
                </li>

                {/* Total Uang Jajan */}
                <li>
                  Total Uang Jajan di <b>SeaBank Adi Permadi</b> Harus Sebesar{" "}
                  <b>
                    {(Number(sisaUangJajan) + uangJajan).toLocaleString(
                      "id-ID"
                    )}
                  </b>
                </li>

                {/* Catat Komisi Bersih */}
                <li>
                  Catat Komisi Bersih Ke <b>Excel</b> Sebesar{" "}
                  <b>{komisiBersih.toLocaleString("id-ID")}</b>
                </li>

                {/* Hold */}
              </ol>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AlokasiPemasukan;
