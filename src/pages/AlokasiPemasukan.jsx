import { useState } from "react";

const metode = {
  kebutuhanPokok: 45,
  investasi: 30,
  keinginan: 20,
  sedekah: 5,
};

const AlokasiPemasukan = () => {
  const [pemasukan, setPemasukan] = useState();
  const [pemasukanReal, setPemasukanReal] = useState(0);
  const [kebutuhanPokok, setKebutuhanPokok] = useState(0);
  const [investasi, setInvestasi] = useState(0);
  const [keinginan, setKeinginan] = useState(0);
  const [amal, setAmal] = useState(0);
  const [sudahHitung, setSudahHitung] = useState(false);

  const hitung = (e) => {
    e.preventDefault();
    const hitungTotal = (persen) => {
      return (persen / 100) * pemasukan;
    };

    setKebutuhanPokok(hitungTotal(metode.kebutuhanPokok));
    setInvestasi(hitungTotal(metode.investasi));
    setKeinginan(hitungTotal(metode.keinginan));
    setAmal(hitungTotal(metode.sedekah));
    setPemasukanReal(pemasukan - hitungTotal(metode.sedekah));

    setSudahHitung(true);
  };

  return (
    <div>
      <div>
        <form>
          <div className="input-components">
            <label htmlFor="pemasukan">Berapa Pemasukan Anda : </label>
            <input
              type="number"
              id="pemasukan"
              defaultValue={pemasukan}
              onChange={(e) => {
                setPemasukan(e.target.value);
              }}
            />
            <button
              className="px-2 py-1 rounded bg-green-600 mx-3"
              onClick={hitung}
            >
              Hitung
            </button>
          </div>
        </form>
      </div>
      {sudahHitung && (
        <div className="px-3 py-2">
          <p>
            Uang Untuk Kebutuhan Pokok : Rp{" "}
            {kebutuhanPokok.toLocaleString("id-ID")}
          </p>
          <p>
            Investasikan Uang Sebesar : Rp {investasi.toLocaleString("id-ID")}
          </p>
          <p>Uang Untuk Jajan : Rp {keinginan.toLocaleString("id-ID")}</p>
          <p>Uang Untuk Lainnya : Rp {amal.toLocaleString("id-ID")}</p>
          <p className="mt-4">
            Total Pemasukan Real :{" "}
            <b>Rp {pemasukanReal.toLocaleString("id-ID")}</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default AlokasiPemasukan;
