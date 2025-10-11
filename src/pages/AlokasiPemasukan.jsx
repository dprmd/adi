import { useState } from "react";
import { useNavigate } from "react-router";
import { formatNumber, raw, validateNumber } from "../utils/generalFunction";
import WordInBracket from "../components/WordInBracket";

// Harus Ada Total 100
const metode = {
  danaDarurat: 60,
  investasi: 30,
  sedekah: 1,
};

// Patungan Untuk Uang Harian Ema Iki
const patunganUntukEma = {
  uko: 29000,
  adi: 29000,
};

const gajiPerHari = 50000;

// Additional function
const today = new Date();
const day = today.getDay();
const dayName = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];

const AlokasiPemasukan = () => {
  // State
  const navigate = useNavigate();
  const [sudahHitung, setSudahHitung] = useState(false);
  const [kerja, setKerja] = useState(day === 0 ? false : true);
  const [simpleMode, setSimpleMode] = useState(true);

  // Hari Minggu Tidak Kerja

  // Start
  const [totalPenghasilanShopee, setTotalPenghasilanShopee] = useState("");
  const [hutangUko, setHutangUko] = useState("0");
  const [penghasilanHPP, setPenghasilanHPP] = useState("");
  const [komisiKotor, setKomisiKotor] = useState(0);
  const [komisiBersih, setKomisiBersih] = useState(0);

  // Variables
  const [uangAdeSiska, setUangAdeSiska] = useState(0);
  const [uangEmaIki, setUangEmaIki] = useState(0);
  const [uangUntukSedekah, setUangUntukSedekah] = useState(0);
  const [uangDanaDarurat, setUangDanaDarurat] = useState(0);
  const [uangInvestasi, setUangInvestasi] = useState(0);

  // Function
  const hitungSekarang = (e) => {
    e.preventDefault();

    // variable
    const getKomisiKotor = raw(totalPenghasilanShopee) - raw(penghasilanHPP);
    setKomisiKotor(getKomisiKotor);

    // Hitung Total Untuk Ade Siska
    const untukAdeSiska =
      raw(totalPenghasilanShopee) -
      (patunganUntukEma.uko + getKomisiKotor) -
      raw(hutangUko);
    if (kerja) {
      setUangAdeSiska(untukAdeSiska - gajiPerHari);
    } else {
      setUangAdeSiska(untukAdeSiska);
    }

    // Hitung Uang Untuk Ma Iki Dari Komisi Kotor
    const uangUntukMaIki = patunganUntukEma.uko + patunganUntukEma.adi;
    setUangEmaIki(uangUntukMaIki);

    // Hitung Sedekah
    const sisaKomisiSemiBersih = getKomisiKotor - patunganUntukEma.adi;
    const uangSedekah = Math.round(
      (metode.sedekah / 100) * sisaKomisiSemiBersih
    );
    setUangUntukSedekah(uangSedekah);

    // Total Komisi Bersih
    const totalKomisiBersih =
      getKomisiKotor - (patunganUntukEma.adi + uangSedekah);
    setKomisiBersih(totalKomisiBersih);

    // Pembagian Ke Rekening Yang Berbeda
    const pembagian = {
      uangDanaDarurat: Math.round(
        (metode.danaDarurat / 100) * totalKomisiBersih
      ),
      uangInvestasi: Math.round((metode.investasi / 100) * totalKomisiBersih),
    };

    // Hitung uang sisa pembagian
    const totalPembagian =
      pembagian.uangDanaDarurat +
      pembagian.uangInvestasi
    const sisaPembagian = totalKomisiBersih - totalPembagian

    setUangDanaDarurat(pembagian.uangDanaDarurat + sisaPembagian);
    setUangInvestasi(pembagian.uangInvestasi);

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
        {/* Tombol On Off Kerja */}
        <div className="flex items-center justify-between input-components">
          <span>Hari : {dayName[day]}</span>
        </div>

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

        {/* Tombol On Off Mode Simple */}
        <div className="flex items-center justify-between input-components">
          <span>Mode Simple</span>
          <button
            type="button"
            onClick={() => {
              setSimpleMode(!simpleMode);
            }}
            className={`w-[45px] h-[25px] rounded-full flex ${
              simpleMode
                ? "bg-green-400 justify-end"
                : "bg-slate-300 justify-start"
            }`}
          >
            <span className="inline-block w-[25px] h-[25px] bg-black rounded-full"></span>
          </button>
        </div>

        {/* Input Total Penarikan Dana */}
        <div className="input-components">
          <label className="block" htmlFor="totalPenghasilanShopee">
            Masukan Total Penghasilan :
          </label>
          <input
            type="text"
            id="totalPenghasilanShopee"
            value={totalPenghasilanShopee}
            required={true}
            onChange={(e) => {
              const number = validateNumber(e);
              setTotalPenghasilanShopee(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Input Penghasilan HPP */}
        <div className="input-components">
          <label className="block" htmlFor="penghasilanHPP">
            Masukan Penghasilan HPP :
          </label>
          <input
            type="text"
            id="penghasilanHPP"
            value={penghasilanHPP}
            required={true}
            onChange={(e) => {
              const number = validateNumber(e);
              setPenghasilanHPP(formatNumber(number));
            }}
            placeholder="Isi di sini . . ."
          />
        </div>

        {/* Input Hutang Uko */}
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

      {/* Tampilkan Saat Tombol Hitung Di Tekan */}
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
              Setor Untuk Ade Siska : <b>{formatNumber(uangAdeSiska)}</b>
              {!simpleMode && (
                <WordInBracket
                  kalimat={`Total Penghasilan - Komisi Kotor - Patungan Ema
                    ${kerja ? "- Gaji Per Hari" : ""}
                    ${raw(hutangUko) > 0 ? " - Hutang Uko" : ""}`}
                />
              )}
            </p>
            <p>
              Uang Untuk Ema Iki : <b>{formatNumber(uangEmaIki)}</b>
              {!simpleMode && (
                <WordInBracket
                  kalimat={`Uko ${formatNumber(
                    patunganUntukEma.uko
                  )} + Adi ${formatNumber(patunganUntukEma.adi)}`}
                />
              )}
            </p>
            <p>
              Uang Untuk Sedekah : <b>{formatNumber(uangUntukSedekah)}</b>
              {!simpleMode && (
                <span className="mx-1">
                  <span>(</span>
                  <span className="text-gray-400 text-sm inline-block mx-1">
                    {metode.sedekah}% x{" "}
                    {formatNumber(komisiKotor - patunganUntukEma.adi)}
                  </span>
                  <span>)</span>
                </span>
              )}
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
                {simpleMode ? (
                  // Simple Mode
                  <div>
                    Transfer Ke <b>SeaBank Ade Siska</b>{" "}
                    {day === 0 && <span>Ditambah Hutang HP</span>} Sebesar{" "}
                    <b>
                      {day === 0
                        ? formatNumber(uangAdeSiska + 100000)
                        : formatNumber(uangAdeSiska)}
                    </b>
                  </div>
                ) : (
                  // Ribet Mode
                  <div>
                    Transfer Uang Ke <b>SeaBank Ade Siska</b> Sebesar{" "}
                    <b>{formatNumber(uangAdeSiska)}</b>
                  </div>
                )}
              </li>

              {/* Transfer Uang Dana Darurat + Investasi + Sedekah */}
              <li>
                {simpleMode ? "Transfer" : "Transfer Uang"}{" "}
                {!simpleMode && (
                  <WordInBracket
                    kalimat={`Dana Darurat + Investasi + Sedekah  ${
                      kerja ? " + Gaji Perhari" : ""
                    }`}
                  />
                )}{" "}
                Ke <b>SeaBank Adi Permadi</b> Sebesar{" "}
                <b>
                  {formatNumber(
                    uangDanaDarurat +
                      uangInvestasi +
                      uangUntukSedekah +
                      (kerja ? gajiPerHari : 0)
                  )}
                </b>
              </li>

              {/* Transfer Uang Hutang */}
              {raw(hutangUko) > 0 && (
                <li>
                  <span>Transfer Uang Hutang Ke </span>
                  <b>SeaBank Adi Permadi</b> Sebesar{" "}
                  <b>{formatNumber(raw(hutangUko))}</b>
                </li>
              )}

              {/* Transfer Uang Ema IKI */}
              <li className="mb-6">
                {simpleMode ? "Transfer" : "Transfer Uang"} Ke{" "}
                <b>Dana Iki Maskiah</b> Sebesar{" "}
                <b>
                  {formatNumber(patunganUntukEma.adi + patunganUntukEma.uko)}
                </b>
              </li>

              {/* Catat Pemasukan Ke Dana Darurat */}
              <div className="mb-6">
                {!simpleMode && (
                  <>
                    <li>
                      Catat Pemasukan Uang Dana Darurat Sebesar{" "}
                      <b>{formatNumber(uangDanaDarurat)}</b>
                    </li>
                    {raw(hutangUko) > 0 && (
                      <li>
                        Catat Pemasukan Uang Dana Darurat
                        <WordInBracket kalimat={"Hutang Uko"} />
                        Sebesar <b>{formatNumber(raw(hutangUko))}</b>
                      </li>
                    )}
                    <li>
                      Catat Pemasukan Uang Investasi Sebesar{" "}
                      <b>{formatNumber(uangInvestasi)}</b>
                    </li>
                    <li>
                      Catat Pemasukan Uang Sedekah Sebesar{" "}
                      <b>{formatNumber(uangUntukSedekah)}</b>
                    </li>
                    {kerja && (
                      <li>
                        Catat Pemasukan Uang Dana Darurat
                        <WordInBracket kalimat={"Gaji"} />
                        Sebesar <b>{formatNumber(gajiPerHari)}</b>
                      </li>
                    )}
                  </>
                )}
                {simpleMode && (
                  <li>
                    Catat Ke Aplikasi Keuangan :
                    <ol className="simplemodetransfer list-inside">
                      <li>
                        <span>Rekening Dana Darurat</span>{" "}
                        <div className="bg-slate-900 flex-auto h-[2px] mx-1"></div>
                        <b>{formatNumber(uangDanaDarurat)}</b>
                      </li>
                      {raw(hutangUko) > 0 && (
                        <li>
                          <span>
                            Rekening Dana Darurat
                            <WordInBracket kalimat={"Hutang Uko"} />
                          </span>
                          <div className="bg-slate-900 flex-auto h-[2px] mx-1"></div>
                          <b>{formatNumber(raw(hutangUko))}</b>
                        </li>
                      )}
                      <li>
                        <span>Rekening Investasi</span>
                        <div className="bg-slate-900 flex-auto h-[2px] mx-1"></div>
                        <b>{formatNumber(uangInvestasi)}</b>
                      </li>
                      <li>
                        <span>Rekening Sedekah</span>
                        <div className="bg-slate-900 flex-auto h-[2px] mx-1"></div>
                        <b>{formatNumber(uangUntukSedekah)}</b>
                      </li>
                      {kerja && (
                        <li>
                          <span>
                            Rekening Dana Darurat
                            <WordInBracket kalimat={"Gaji"} />
                          </span>
                          <div className="bg-slate-900 flex-auto h-[2px] mx-1"></div>
                          <b>{formatNumber(gajiPerHari)}</b>
                        </li>
                      )}
                    </ol>
                  </li>
                )}
              </div>

              {/* Catat Komisi Bersih */}
              <li>
                Catat Komisi Bersih Ke <b>Excel</b> Sebesar{" "}
                <b>{formatNumber(komisiBersih)}</b>
              </li>

              {/* Catat Hutang HP */}
              {day === 0 && (
                <li>
                  Catat Hutang HP Dibayar Sebesar <b>{formatNumber(100000)}</b>
                </li>
              )}
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
                  Dana Darurat : <b>{metode.danaDarurat}%</b>
                </li>
                <li>
                  Investasi : <b>{metode.investasi}%</b>
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
