import { useState } from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

export const useAduanForm = () => {
  const [dataForm, setDataForm] = useState({
    nama_kasus: '',
    kronologi: '',
    waktu_kejadian: '',
    id_kategori: '',
    pelaku: [
      {
        nama: '',
        jabatan: '',
        id_unit: '',
      },
    ],
    file: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePelakuChange = (index, e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      pelaku: prev.pelaku.map((p, i) =>
        i === index ? { ...p, [name]: value } : p,
      ),
    }));
  };

  const tambahPelaku = () => {
    setDataForm((prev) => ({
      ...prev,
      pelaku: [...prev.pelaku, { nama: '', jabatan: '', id_unit: '' }],
    }));
  };

  const hapusPelaku = (index) => {
    setDataForm((prev) => {
      if (prev.pelaku.length === 1) return prev;
      return {
        ...prev,
        pelaku: prev.pelaku.filter((_, i) => i !== index),
      };
    });
  };

  const handleFileChange = (files) => {
    const validFiles = [];
    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`File "${file.name}" tidak didukung. Hanya JPG, JPEG, PNG, dan PDF.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" melebihi batas maksimum 5MB.`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    setDataForm((prev) => {
      const existingSize = prev.file.reduce((acc, f) => acc + f.size, 0);
      const newSize = validFiles.reduce((acc, f) => acc + f.size, 0);
      const totalSize = existingSize + newSize;

      if (totalSize > MAX_FILE_SIZE) {
        toast.error(`Total ukuran semua file (${(totalSize / 1024 / 1024).toFixed(1)}MB) melebihi batas maksimum 5MB.`);
        return prev;
      }

      return {
        ...prev,
        file: [...prev.file, ...validFiles],
      };
    });
  };

  const removeFile = (index) => {
    setDataForm((prev) => ({
      ...prev,
      file: prev.file.filter((_, i) => i !== index),
    }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  return {
    dataForm,
    setDataForm,
    handleChange,
    handlePelakuChange,
    tambahPelaku,
    hapusPelaku,
    handleFileChange,
    removeFile,
    modules,
  };
};
