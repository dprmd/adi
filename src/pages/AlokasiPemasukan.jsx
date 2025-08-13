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

const AlokasiPemasukan = () => {
  // State
  const navigate = useNavigate();
  const [sudahHitung, setSudahHitung] = useState(false);

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
      hutangUko -
      gajiPerHari;
    setUangAdeSiska(untukAdeSiska);

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
    <div>
      <form>
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
                  UangAdeSiska - GajiPerHari - HutangUko
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

                {/* Transfer Uang Pokok + Investasi + Ema Iki + Sedekah */}
                <li>
                  Transfer Uang (Pokok + Investasi + Ema Iki + Sedekah + Gaji
                  Per Hari) Ke <b>SeaBank Haerudin</b> Sebesar{" "}
                  <b>
                    {(
                      uangEmaIki +
                      uangPokok +
                      uangInvestasi +
                      uangUntukSedekah +
                      gajiPerHari
                    ).toLocaleString("id-ID")}
                  </b>
                </li>

                {/* Catat Pemasukan Ke Pokok */}
                <li>
                  Catat Pemasukan Uang Pokok Sebesar{" "}
                  <b>{uangPokok.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Catat Pemasukan Uang Pokok (
                  <span className="text-gray-500 text-sm mx-1">Gaji</span>)
                  Sebesar <b>{gajiPerHari.toLocaleString("id-ID")}</b>
                </li>
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
