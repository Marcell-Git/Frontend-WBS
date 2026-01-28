export const isEmpty = (val) =>
  val === null ||
  val === undefined ||
  (typeof val === 'string' && val.trim() === '');

export const isAduanFormValid = (data) => {
  return (
    !isEmpty(data.nama_kasus) &&
    !isEmpty(data.kronologi) &&
    !isEmpty(data.waktu_kejadian) &&
    !isEmpty(data.id_kategori) &&
    Array.isArray(data.pelaku) &&
    data.pelaku.length > 0 &&
    data.pelaku.every(
      (p) =>
        !isEmpty(p.nama) &&
        !isEmpty(p.jabatan) &&
        !isEmpty(p.id_unit)
    ) &&
    Array.isArray(data.file) &&
    data.file.length > 0
  );
};
