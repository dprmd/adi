import { useState } from "react";
import { useNavigate } from "react-router";
import { formatNumber, raw, validateNumber } from "../utils/generalFunction";

// Harus Ada Total 100
const metode = {
  kebutuhanPokok: 49,
  investasi: 20,
  keinginan: 10,
  hutang: 20,
  sedekah: 1,
};

const patunganUntukEma = {
  uko: 50000,
  adi: 8000,
};

const gajiPerHari = 50000;

const AlokasiPemasukan = () => {
  // State
  const navigate = useNavigate();
  const [sudahHitung, setSudahHitung] = useState(false);
  const [kerja, setKerja] = useState(true);

  // Start
  const [totalPenghasilanShopee, setTotalPenghasilanShopee] = useState("");
  const [sisaUangJajan, setSisaUangJajan] = useState("0");
  const [hutangUko, setHutangUko] = useState("0");
  const [komisiKotor, setKomisiKotor] = useState("");
  const [komisiBersih, setKomisiBersih] = useState(0);

  // Variables
  const [uangAdeSiska, setUangAdeSiska] = useState(0);
  const [uangEmaIki, setUangEmaIki] = useState(0);
  const [uangUntukSedekah, setUangUntukSedekah] = useState(0);
  const [uangPokok, setUangPokok] = useState(0);
  const [uangInvestasi, setUangInvestasi] = useState(0);
  const [uangJajan, setUangJajan] = useState(0);
  const [uangHutang, setUangHutang] = useState(0);

  // Function
  const hitungSekarang = (e) => {
    e.preventDefault();

    // Hitung Total Untuk Ade Siska
    const untukAdeSiska =
      raw(totalPenghasilanShopee) -
      (patunganUntukEma.uko + raw(komisiKotor)) -
      raw(hutangUko);
    if (kerja) {
      setUangAdeSiska(untukAdeSiska - gajiPerHari);
    } else {
      setUangAdeSiska(untukAdeSiska);
    }

    console.log(typeof raw(komisiKotor));

    // Hitung Uang Untuk Ma Iki Dari Komisi Kotor
    const uangUntukMaIki = patunganUntukEma.uko + patunganUntukEma.adi;
    setUangEmaIki(uangUntukMaIki);

    // Hitung Sedekah
    const sisaKomisiSemiBersih = raw(komisiKotor) - patunganUntukEma.adi;
    const uangSedekah = Math.round(
      (metode.sedekah / 100) * sisaKomisiSemiBersih
    );
    setUangUntukSedekah(uangSedekah);

    // Total Komisi Bersih
    const totalKomisiBersih =
      raw(komisiKotor) - (patunganUntukEma.adi + uangSedekah);
    setKomisiBersih(totalKomisiBersih);

    // Pembagian Ke Rekening Yang Berbeda
    setUangPokok(Math.round((metode.kebutuhanPokok / 100) * totalKomisiBersih));
    setUangInvestasi(Math.round((metode.investasi / 100) * totalKomisiBersih));
    setUangJajan(Math.round((metode.keinginan / 100) * totalKomisiBersih));
    setUangHutang(Math.round((metode.hutang / 100) * totalKomisiBersih));

    // Render
    setSudahHitung(true);
  };

  return (
    <div className="flex justify-center items-center flex-col py-3">
      <h1 className="text-2xl font-bold">Alokasi Pemasukan</h1>
      <form
        className="border border-slate-400 rounded-md w-max mx-auto mt-3 p-4 max-w-[400px]"
        onSubmit={hitungSekarang}
      >
        <div className="flex items-center justify-between input-components">
          <span>Kerja Hari Ini</span>
          <button
            type="button"
            onClick={() => {
              setKerja(!kerja);
              hitungSekarang();
            }}
            className={`w-[45px] h-[25px] rounded-full flex ${
              kerja ? "bg-green-400 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <span className="inline-block w-[25px] h-[25px] bg-black rounded-full"></span>
          </button>
        </div>
        {/* Total Penarikan Dana */}
        <div className="input-components">
          <label className="block" htmlFor="totalPenghasilanShopee">
            Masukan Total Penghasilan :
          </label>
          <input
            type="text"
            value={totalPenghasilanShopee}
            required={true}
            onChange={(e) => {
              const number = validateNumber(e);
              setTotalPenghasilanShopee(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Komisi Kotor */}
        <div className="input-components">
          <label className="block" htmlFor="komisiKotor">
            Masukan Komisi Kotor :
          </label>
          <input
            type="text"
            value={komisiKotor}
            required={true}
            onChange={(e) => {
              const number = validateNumber(e);
              setKomisiKotor(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Sisa Uang Jajan */}
        <div className="input-components">
          <label className="block" htmlFor="sisaUangJajanSaatIni">
            Masukan Sisa Uang Jajan Saat Ini :
          </label>
          <input
            type="text"
            value={sisaUangJajan}
            onChange={(e) => {
              const number = validateNumber(e);
              setSisaUangJajan(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Hutang Uko */}
        <div className="input-components">
          <label className="block" htmlFor="hutangUko">
            Hutang Uko (Jika Ada) :
          </label>
          <input
            type="text"
            value={hutangUko}
            onChange={(e) => {
              const number = validateNumber(e);
              setHutangUko(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Tombol Navigasi */}
        <div className="input-components">
          <button
            type="button"
            className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-md mr-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Kembali
          </button>

          {/* Hitung Sekarang */}
          <button
            className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-md"
            type="submit"
          >
            Hitung Sekarang
          </button>
        </div>
      </form>

      {sudahHitung && (
        <div className="border border-gray-400 rounded-md p-4 mt-4 flex flex-col gap-y-4 mx-2">
          <div>
            {/* Judul */}
            <b className="text-lg">Ringkasan</b>
            <p>
              Total Penghasilan Dari Shopee :{" "}
              <b>{formatNumber(totalPenghasilanShopee)}</b>
            </p>
            <p>
              Komisi Kotor : <b>{formatNumber(komisiKotor)}</b>
            </p>
            <p>
              Setor Untuk Ade Siska : <b>{formatNumber(uangAdeSiska)}</b> (
              <span className="text-gray-400 text-sm inline-block mx-1">
                Total Penghasilan - Komisi Kotor - Patungan Ema{" "}
                {kerja ? "- Gaji Per Hari" : ""}{" "}
                {raw(hutangUko) > 0 ? " - Hutang Uko" : ""}
              </span>
              )
            </p>
            <p>
              Uang Untuk Ema Iki : <b>{formatNumber(uangEmaIki)}</b>
              <span className="mx-1">
                (
                <span className="text-gray-400 text-sm inline-block mx-1">
                  Uko {formatNumber(patunganUntukEma.uko)} + Adi{" "}
                  {formatNumber(patunganUntukEma.adi)}
                </span>
                )
              </span>
            </p>
            <p>
              Uang Untuk Sedekah : <b>{formatNumber(uangUntukSedekah)}</b>
              <span className="mx-1">
                (
                <span className="text-gray-400 text-sm inline-block mx-1">
                  {metode.sedekah}% x{" "}
                  {formatNumber(raw(komisiKotor) - patunganUntukEma.adi)}
                </span>
                )
              </span>
            </p>
            <p>
              Komisi Bersih : <b>{formatNumber(komisiBersih)}</b>
            </p>
          </div>

          {/* Next Step */}
          <div>
            {/* Judul */}
            <b className="text-lg">Yang Dilakukan Selanjutnya</b>
            <ol className="list-decimal ml-6">
              {/* Transfer Ke Ade Siska */}
              <li>
                Transfer Uang Ke <b>SeaBank Ade Siska</b> Sebesar{" "}
                <b>{formatNumber(uangAdeSiska)}</b>
              </li>

              {/* Hutang Uko */}
              {raw(hutangUko) > 0 && (
                <li>
                  Transfer Uang Bayar Hutang Uko Ke <b>SeaBank Haerudin</b>{" "}
                  Sebesar <b>{formatNumber(hutangUko)}</b>
                </li>
              )}

              {/* Transfer Uang Pokok + Investasi + Ema Iki + Sedekah */}
              <li>
                Transfer Uang{" "}
                <span className="text-sm text-gray-400">
                  (Pokok + Investasi + Ema Iki + Sedekah + Hutang
                  {kerja ? " + Gaji Perhari" : ""})
                </span>{" "}
                Ke <b>SeaBank Haerudin</b> Sebesar{" "}
                <b>
                  {formatNumber(
                    uangEmaIki +
                      uangPokok +
                      uangInvestasi +
                      uangUntukSedekah +
                      uangHutang +
                      (kerja ? gajiPerHari : 0)
                  )}
                </b>
              </li>

              {/* Catat Pemasukan Ke Pokok */}
              <li>
                Catat Pemasukan Uang Pokok Sebesar{" "}
                <b>{formatNumber(uangPokok)}</b>
              </li>
              {kerja && (
                <li>
                  Catat Pemasukan Uang Pokok (
                  <span className="text-gray-500 text-sm mx-1">Gaji</span>)
                  Sebesar <b>{formatNumber(gajiPerHari)}</b>
                </li>
              )}
              <li>
                Catat Pemasukan Uang Investasi Sebesar{" "}
                <b>{formatNumber(uangInvestasi)}</b>
              </li>
              <li>
                Catat Pemasukan Uang Jajan Sebesar{" "}
                <b>{formatNumber(uangJajan)}</b>
              </li>
              <li>
                Catat Pemasukan Uang Hutang Sebesar{" "}
                <b>{formatNumber(uangHutang)}</b>
              </li>
              <li>
                Catat Pemasukan Uang Sedekah Sebesar{" "}
                <b>{formatNumber(uangUntukSedekah)}</b>
              </li>

              {/* Total Uang Jajan */}
              <li>
                Total Uang Jajan di <b>SeaBank Adi Permadi</b> Harus Sebesar{" "}
                <b>{formatNumber(raw(sisaUangJajan) + uangJajan)}</b>
              </li>

              {/* Catat Komisi Bersih */}
              <li>
                Catat Komisi Bersih Ke <b>Excel</b> Sebesar{" "}
                <b>{formatNumber(komisiBersih)}</b>
              </li>
            </ol>
          </div>
          <div>
            {/* Judul */}
            <b className="text-lg">Catatan</b>
            <div className="flex flex-col">
              <span>Patungan Untuk Ema</span>
              <ol className="list-inside px-2">
                <li>
                  UKO : <b>{formatNumber(patunganUntukEma.uko)}</b>
                </li>
                <li>
                  ADI : <b>{formatNumber(patunganUntukEma.adi)}</b>
                </li>
              </ol>
              <span>
                Gaji Per Hari : <b>{formatNumber(gajiPerHari)}</b>
              </span>
              <span>Metode Pembagian</span>
              <ol className="list-inside px-2">
                <li>
                  Pokok : <b>{metode.kebutuhanPokok}%</b>
                </li>
                <li>
                  Hutang : <b>{metode.hutang}%</b>
                </li>
                <li>
                  Investasi : <b>{metode.investasi}%</b>
                </li>
                <li>
                  Jajan : <b>{metode.keinginan}%</b>
                </li>
                <li>
                  Sedekah : <b>{metode.sedekah}%</b>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlokasiPemasukan;
