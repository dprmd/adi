import { useState } from "react";
import { useNavigate } from "react-router";

const metode = {
  kebutuhanPokok: 45,
  investasi: 30,
  keinginan: 20,
  sedekah: 5,
};

const patunganUntukEma = {
  uko: 40000,
  adi: 18000,
};

const AlokasiPemasukan = () => {
  // State
  const navigate = useNavigate();
  // Start
  const [sudahHitung, setSudahHitung] = useState(false);
  const [totalPenarikanDana, setTotalPenarikanDana] = useState("");
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
      Number(totalPenarikanDana) - (patunganUntukEma.uko + Number(komisiKotor));
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
                <b>{uangAdeSiska.toLocaleString("id-ID")}</b>
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
            <div>
              <b>Yang Dilakukan Selanjutnya</b>
              <ol className="list-decimal ml-6">
                <li>
                  Transfer Ke Ade Siska Sebesar{" "}
                  <b>{uangAdeSiska.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Transfer Uang Harian <b>Ema Iki</b> Ke <b>SeaBank Haerudin</b>{" "}
                  Sebesar <b>{uangEmaIki.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Transfer Uang Investasi Ke <b>Dana Adi Permadi</b> Sebesar{" "}
                  <b>{uangInvestasi.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Transfer Uang Pokok Ke <b>Dana Iki Maskiah</b> Sebesar{" "}
                  <b>{uangPokok.toLocaleString("id-ID")}</b>
                </li>
                <li>
                  Transfer Uang Jajan Ke <b>SeaBank Adi Permadi</b> Sebesar{" "}
                  <b>{uangJajan.toLocaleString("id-ID")}</b>
                </li>
              </ol>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AlokasiPemasukan;
