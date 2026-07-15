import { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';

import { useAduanForm } from '../hooks/useAduanForm';

import { isAduanFormValid } from '../utils/FormValidation';

import Navbar from '../components/Navbar';
import KonfirmasiModal from '../components/Modal/KonfirmasiModal';
import TiketModal from '../components/Modal/TiketModal';
import DetailKasusSection from '../components/Aduan/DetailKasusSection';
import PelakuSection from '../components/Aduan/PelakuSection';
import KronologiSection from '../components/Aduan/KronologiSection';
import FileUploadSection from '../components/Aduan/FileUploadSection';

import { useAuth } from '../context/AuthContext';
import { submitAduanApi } from '../api/AduanApi';
import { getAllODPApi } from '../api/ODPApi';
import { showKategoriAduanApi } from '../api/KategoriAduanApi';

const AduanPage = () => {
  const [odpList, setOdpList] = useState([]);
  const [kategoriAduanList, setKategoriAduanList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const {
    dataForm,
    setDataForm,
    handleChange,
    handlePelakuChange,
    tambahPelaku,
    hapusPelaku,
    handleFileChange,
    removeFile,
    modules,
  } = useAduanForm();

  const { logout } = useAuth();

  const fetchAllData = async () => {
    try {
      const odpData = await getAllODPApi();
      setOdpList(odpData);
      const kategoriData = await showKategoriAduanApi();
      setKategoriAduanList(kategoriData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCheckBeforeSubmit = (e) => {
    e.preventDefault();
    if (!isAduanFormValid(dataForm)) {
      if (!dataForm.file || dataForm.file.length === 0) {
        toast.error('Bukti aduan wajib diunggah.');
      } else if (dataForm.file.some((f) => f.size > 5 * 1024 * 1024)) {
        toast.error('Ada file yang melebihi batas maksimum 5MB per file.');
      } else {
        const totalSize = dataForm.file.reduce((acc, f) => acc + f.size, 0);
        if (totalSize > 5 * 1024 * 1024) {
          toast.error(`Total ukuran file (${(totalSize / 1024 / 1024).toFixed(1)}MB) melebihi batas maksimum 5MB.`);
        } else {
          toast.error('Mohon lengkapi seluruh data sebelum dikirim');
        }
      }
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('nama_kasus', dataForm.nama_kasus);
      formData.append('kronologi', dataForm.kronologi);
      formData.append('waktu_kejadian', dataForm.waktu_kejadian);
      formData.append('id_kategori', dataForm.id_kategori);

      dataForm.pelaku.forEach((p, i) => {
        formData.append(`pelaku[${i}][nama]`, p.nama);
        formData.append(`pelaku[${i}][jabatan]`, p.jabatan);
        formData.append(`pelaku[${i}][id_unit]`, p.id_unit);
      });

      if (dataForm.file) {
        dataForm.file.forEach((f) => {
          formData.append('file[]', f);
        });
      }

      const res = await submitAduanApi(formData);
      setTicketData(res.data.kode_tiket);
      setIsModalOpen(false);
      setTimeout(() => {
        setShowTicket(true);
      }, 300);
    } catch (error) {
      console.error('Error submitting aduan:', error);

      if (error.response?.status === 413) {
        toast.error('Ukuran file melebihi batas maksimum 5MB. Silakan kompres atau pilih file yang lebih kecil.');
      } else if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        toast.error(firstError || 'Gagal mengirim aduan. Silakan coba lagi.');
      } else {
        toast.error(error.response?.data?.message || 'Gagal mengirim aduan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseTicketModal = async () => {
    setShowTicket(false);
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="container mx-auto px-4 mt-24 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Formulir Pengaduan
          </h1>
          <p className="text-gray-500 mt-2">
            Isi formulir di bawah ini dengan lengkap. Identitas pelapor
            dirahasiakan.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
          <form onSubmit={handleCheckBeforeSubmit} className="space-y-10">
            <DetailKasusSection
              dataForm={dataForm}
              kategoriAduanList={kategoriAduanList}
              handleChange={handleChange}
            />

            <PelakuSection
              pelakuList={dataForm.pelaku}
              odpList={odpList}
              onChange={handlePelakuChange}
              onAdd={tambahPelaku}
              onDelete={hapusPelaku}
            />

            <KronologiSection
              value={dataForm.kronologi}
              onChange={(value) =>
                setDataForm((prev) => ({ ...prev, kronologi: value }))
              }
              modules={modules}
            />

            <FileUploadSection
              files={dataForm.file}
              onChange={handleFileChange}
              onRemove={removeFile}
            />

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Kirim Laporan Sekarang</span>
                <MdSend size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <KonfirmasiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        isSubmitting={isSubmitting}
        data={dataForm}
        kategoriList={kategoriAduanList}
        unitList={odpList}
      />

      <TiketModal
        isOpen={showTicket}
        ticketId={ticketData}
        onClose={handleCloseTicketModal}
      />
    </div>
  );
};

export default AduanPage;
