import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const TotalDompet = () => {
  // state
  const navigate = useNavigate();
  const [tampilkanJumlah, setTampilkanJumlah] = useState(false);

  // variables
  const uangMaIkiPerHari = 58000;

  // input
  const [saldoPokok, setSaldoPokok] = useState("");
  const [saldoInvestasi, setSaldoInvestasi] = useState("");
  const [saldoSedekah, setSaldoSedekah] = useState("");
  const [totalSaldoFix, setTotalSaldoFix] = useState("");
  const [saldoEmaIki, setSaldoEmaIki] = useState("");

  // function
  const jumlahkan = (e) => {
    e.preventDefault();
    const saldo =
      Number(saldoPokok) +
      Number(saldoInvestasi) +
      Number(saldoSedekah) -
      saldoEmaIki;
    setTotalSaldoFix(saldo);
    setTampilkanJumlah(true);
  };

  useEffect(() => {
    const hariIni = new Date().getDay();
    const totalUangEmaIki = [
      uangMaIkiPerHari * 3,
      uangMaIkiPerHari * 4,
      uangMaIkiPerHari * 5,
      uangMaIkiPerHari * 6,
      uangMaIkiPerHari * 7,
      uangMaIkiPerHari * 1,
      uangMaIkiPerHari * 2,
    ];
    const totalUangEmaIkiHariIni = totalUangEmaIki[hariIni];
    setSaldoEmaIki(totalUangEmaIkiHariIni);
  }, []);
  return (
    <div className="flex justify-center items-center flex-col gap-y-3">
      <form className="border p-4">
        {/* Saldo Pokok */}
        <div className="input-components">
          <label htmlFor="SaldoPokok">Saldo Pokok : </label>
          <input
            type="number"
            id="SaldoPokok"
            value={saldoPokok}
            placeholder="Isi Saldo Pokok . . ."
            onChange={(e) => {
              setSaldoPokok(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaldoPokok("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Saldo Investasi */}
        <div className="input-components">
          <label htmlFor="SaldoInvestasi">Saldo Investasi : </label>
          <input
            type="number"
            id="SaldoInvestasi"
            value={saldoInvestasi}
            placeholder="Isi Saldo Investasi . . ."
            onChange={(e) => {
              setSaldoInvestasi(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaldoInvestasi("");
            }}
            className="px-2 py-1 bg-red-500 mx-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {/* Saldo Sedekah */}
        <div className="input-components">
          <label htmlFor="SaldoSedekah">Saldo Sedekah : </label>
          <input
            type="number"
            id="SaldoSedekah"
            value={saldoSedekah}
            placeholder="Isi Saldo Sedekah . . ."
            onChange={(e) => {
              setSaldoSedekah(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaldoSedekah("");
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
            onClick={jumlahkan}
            className="bg-green-600 hover:bg-green-400 px-2 py-1 rounded-md"
          >
            Jumlahkan
          </button>
        </div>

        <div className="px-3 py-2">
          <h2 className="mt-2">
            <h3>
              Total Saldo Terlihat :{" "}
              {(totalSaldoFix + saldoEmaIki).toLocaleString("id-ID")}
            </h3>
            <h3>Total Saldo Asli : {totalSaldoFix.toLocaleString("id-ID")} </h3>
          </h2>
        </div>
      </form>
    </div>
  );
};

export default TotalDompet;
