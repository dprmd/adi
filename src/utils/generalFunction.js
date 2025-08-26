export const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const raw = (num) => {
  return Number(num.replace(/\./g, ""));
};

export const validateNumber = (e) => {
  // Hilangkan titik dulu biar bisa di-parse
  let raw = e.target.value.replace(/\./g, "");
  // Pastikan hanya angka
  if (!/^\d*$/.test(raw)) return;
  else return raw;
};
