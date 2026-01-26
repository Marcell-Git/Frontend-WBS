import { useEffect, useState } from 'react';
import {
  MdAccessTime,
  MdSend,
  MdAdd,
  MdDeleteOutline,
  MdPerson,
  MdWork,
  MdBusiness,
  MdInfoOutline,
} from 'react-icons/md';
import { FileText, UploadCloud, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';
import KonfirmasiModal from '../components/Modal/KonfirmasiModal';
import TiketModal from '../components/Modal/TiketModal';
import { submitAduanApi } from '../api/AduanApi';
import { getAllODPApi } from '../api/ODPApi';
import { showKategoriAduanApi } from '../api/KategoriAduanApi';
import { useAuth } from '../context/AuthContext';

const AduanPage = () => {
  const [odpList, setOdpList] = useState([]);
  const [kategoriAduanList, setKategoriAduanList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);

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

  const isEmpty = (val) =>
    val === null ||
    val === undefined ||
    (typeof val === 'string' && val.trim() === '');

  const isDataFormValid =
    !isEmpty(dataForm.nama_kasus) &&
    !isEmpty(dataForm.kronologi) &&
    !isEmpty(dataForm.waktu_kejadian) &&
    !isEmpty(dataForm.id_kategori) &&
    Array.isArray(dataForm.pelaku) &&
    dataForm.pelaku.length > 0 &&
    dataForm.pelaku.every(
      (p) => !isEmpty(p.nama) && !isEmpty(p.jabatan) && !isEmpty(p.id_unit),
    ) &&
    Array.isArray(dataForm.file) &&
    dataForm.file.length > 0;

  const tambahPelaku = () => {
    setDataForm({
      ...dataForm,
      pelaku: [...dataForm.pelaku, { nama: '', jabatan: '', id_unit: '' }],
    });
  };

  const hapusPelaku = (index) => {
    if (dataForm.pelaku.length === 1) return;
    const updatedPelaku = dataForm.pelaku.filter((_, i) => i !== index);
    setDataForm({ ...dataForm, pelaku: updatedPelaku });
  };

  const handlePelakuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPelaku = dataForm.pelaku.map((pelaku, i) =>
      i === index ? { ...pelaku, [name]: value } : pelaku,
    );
    setDataForm((prev) => ({
      ...prev,
      pelaku: updatedPelaku,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setDataForm((prev) => ({
      ...prev,
      file: [...(prev.file || []), ...newFiles],
    }));
  };

  const removeFile = (indexToRemove) => {
    setDataForm((prev) => ({
      ...prev,
      file: prev.file.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCheckBeforeSubmit = (e) => {
    e.preventDefault();
    if (!isDataFormValid) {
      toast.error('Mohon lengkapi seluruh data sebelum dikirim');
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
      toast.error('Gagal mengirim aduan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseTicketModal = async () => {
    setShowTicket(false);
    await logout();
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
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <MdInfoOutline className="text-blue-600 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">
                  Detail Kasus
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Kategori Aduan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="id_kategori"
                    value={dataForm.id_kategori}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {kategoriAduanList.map((kategori) => (
                      <option
                        key={kategori.id_kategori}
                        value={kategori.id_kategori}
                      >
                        {kategori.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Waktu Kejadian
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <MdAccessTime size={20} />
                    </div>
                    <input
                      name="waktu_kejadian"
                      type="datetime-local"
                      value={dataForm.waktu_kejadian}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Judul Kasus <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="nama_kasus"
                    type="text"
                    value={dataForm.nama_kasus}
                    onChange={handleChange}
                    placeholder="Contoh: Indikasi Pungli di Layanan X..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <MdPerson className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Pihak Terlapor
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={tambahPelaku}
                  className="text-sm flex items-center gap-1 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <MdAdd size={18} /> Tambah
                </button>
              </div>

              <div className="space-y-4">
                {dataForm.pelaku.map((pelaku, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative"
                  >
                    {dataForm.pelaku.length > 1 && (
                      <button
                        type="button"
                        onClick={() => hapusPelaku(index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <MdDeleteOutline size={22} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Unit / ODP
                        </label>
                        <select
                          name="id_unit"
                          value={pelaku.id_unit}
                          onChange={(e) => handlePelakuChange(index, e)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2.5 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        >
                          <option value="">-- Pilih Unit --</option>
                          {odpList.map((odp) => (
                            <option key={odp.id_unit} value={odp.id_unit}>
                              {odp.nama_unit}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Nama Terlapor
                        </label>
                        <input
                          name="nama"
                          type="text"
                          value={pelaku.nama}
                          onChange={(e) => handlePelakuChange(index, e)}
                          placeholder="Nama Lengkap"
                          className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Jabatan
                        </label>
                        <input
                          name="jabatan"
                          type="text"
                          value={pelaku.jabatan}
                          onChange={(e) => handlePelakuChange(index, e)}
                          placeholder="Jabatan / Posisi"
                          className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <FileText className="text-blue-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-gray-800">
                  Kronologi Kejadian
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <ReactQuill
                  theme="snow"
                  value={dataForm.kronologi}
                  onChange={(value) =>
                    setDataForm({ ...dataForm, kronologi: value })
                  }
                  modules={modules}
                  placeholder="Ceritakan detail kejadian (Apa, Siapa, Kapan, Dimana, Mengapa, Bagaimana)..."
                  className="h-64 mb-12"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <UploadCloud className="text-blue-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-gray-800">
                  Bukti Dukung
                </h3>
              </div>

              <div className="w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                    <p className="mb-1 text-sm text-gray-700 font-semibold">
                      Klik untuk upload file
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    name="file[]"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>

                {dataForm.file && dataForm.file.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {Array.from(dataForm.file).map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {f.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
