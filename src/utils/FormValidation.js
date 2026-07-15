export const isEmpty = (val) =>
  val === null ||
  val === undefined ||
  (typeof val === 'string' && val.trim() === '');

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

export const isFileValid = (file) =>
  file.size <= MAX_FILE_SIZE && ALLOWED_TYPES.includes(file.type);

export const isTotalFileSizeValid = (files) => {
  const total = files.reduce((acc, f) => acc + f.size, 0);
  return total <= MAX_FILE_SIZE;
};

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
    data.file.length > 0 &&
    data.file.every((f) => isFileValid(f)) &&
    isTotalFileSizeValid(data.file)
  );
};
