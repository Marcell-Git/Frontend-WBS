import { useState } from 'react';

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
    setDataForm((prev) => ({
      ...prev,
      file: [...prev.file, ...files],
    }));
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
