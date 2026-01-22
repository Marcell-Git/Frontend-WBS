import { MdAccessTime, MdSend } from 'react-icons/md';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { submitAduanApi } from '../api/AduanApi';
import { showODPApi } from '../api/ODPApi';
import { showKategoriAduanApi } from '../api/KategoriAduanApi';
import { toast } from 'react-toastify';
import { FileText, UploadCloud } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import KonfirmasiModal from '../components/Modal/KonfirmasiModal';
import TiketModal from '../components/Modal/TiketModal';

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
      const odpData = await showODPApi();
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
    subjek_pelaku: '',
    waktu_kejadian: '',
    id_kategori: '',
    id_unit: '',
    id_user: '',
    file: null,
  });

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('nama_kasus', dataForm.nama_kasus);
      formData.append('kronologi', dataForm.kronologi);
      formData.append('subjek_pelaku', dataForm.subjek_pelaku);
      formData.append('waktu_kejadian', dataForm.waktu_kejadian);
      formData.append('id_kategori', dataForm.id_kategori);
      formData.append('id_unit', dataForm.id_unit);
      dataForm.file.forEach((f) => {
        formData.append('file[]', f);
      });
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
  ];

  const handleCheckBeforeSubmit = (e) => {
    e.preventDefault();
    if (!dataForm.id_kategori || !dataForm.nama_kasus || !dataForm.kronologi) {
      toast.error('Mohon lengkapi data wajib (bertanda *)');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseTicketModal = async () => {
    setShowTicket(false);

    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 mt-20 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Input Aduan Baru</h1>
          <p className="text-gray-500 mt-2">
            Silakan lengkapi formulir di bawah ini dengan data yang valid.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleCheckBeforeSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="kategori-aduan"
                  className="text-sm font-semibold text-gray-700"
                >
                  Kategori Aduan <span className="text-red-500">*</span>
                </label>
                <select
                  id="kategori-aduan"
                  name="id_kategori"
                  value={dataForm.id_kategori}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
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
                <label
                  htmlFor="kasus"
                  className="text-sm font-semibold text-gray-700"
                >
                  Judul Kasus <span className="text-red-500">*</span>
                </label>
                <input
                  id="nama_kasus"
                  name="nama_kasus"
                  type="text"
                  value={dataForm.nama_kasus}
                  onChange={handleChange}
                  placeholder="Contoh: Keterlambatan Layanan..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="odp"
                  className="text-sm font-semibold text-gray-700"
                >
                  ODP (Unit Terkait)
                </label>
                <select
                  id="id_unit"
                  name="id_unit"
                  value={dataForm.id_unit}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
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
                <label
                  htmlFor="waktu"
                  className="text-sm font-semibold text-gray-700"
                >
                  Waktu Kejadian
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                    <MdAccessTime size={20} />
                  </div>
                  <input
                    id="waktu_kejadian"
                    name="waktu_kejadian"
                    type="datetime-local"
                    value={dataForm.waktu_kejadian}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="subjek-pelaku"
                  className="text-sm font-semibold text-gray-700"
                >
                  Subjek Pelaku (Terlapor)
                </label>
                <input
                  id="subjek_pelaku"
                  name="subjek_pelaku"
                  type="text"
                  value={dataForm.subjek_pelaku}
                  onChange={handleChange}
                  placeholder="Nama orang atau divisi yang dilaporkan"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="kronologi"
                  className="text-sm font-semibold text-gray-700"
                >
                  Kronologi Kejadian <span className="text-red-500">*</span>
                </label>

                <div className="bg-white">
                  <ReactQuill
                    theme="snow"
                    name="kronologi"
                    id="kronologi"
                    value={dataForm.kronologi}
                    onChange={(value) =>
                      setDataForm({ ...dataForm, kronologi: value })
                    }
                    modules={modules}
                    formats={formats}
                    placeholder="Ceritakan detail kejadian secara lengkap (Anda bisa menebalkan teks penting)..."
                    className="h-64 mb-12"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Dokumen Pendukung <span className="text-red-500">*</span>
                </label>

                <div className="w-full">
                  <label
                    htmlFor="file"
                    className="group flex flex-col items-center justify-center w-full h-40 
                    border-2 border-dashed border-gray-300 rounded-xl cursor-pointer 
                    bg-gray-50 hover:bg-gray-100 hover:border-indigo-500 
                    transition-all duration-300 ease-in-out"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                      {!dataForm.file || dataForm.file.length === 0 ? (
                        <>
                          <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6 text-indigo-500" />
                          </div>
                          <p className="mb-1 text-sm text-gray-900 font-semibold">
                            <span className="text-indigo-600">
                              Klik untuk upload
                            </span>{' '}
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, atau PNG (Maks. 5MB)
                          </p>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2 w-full max-w-xs">
                          <p className="text-xs font-semibold text-green-600 mb-1">
                            {dataForm.file.length} File terpilih:
                          </p>
                          <div className="flex flex-col gap-2 w-full">
                            {Array.from(dataForm.file).map((f, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-gray-200 shadow-sm text-left"
                              >
                                <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                <span className="truncate text-gray-700 w-full">
                                  {f.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Kirim Aduan</span>
                <MdSend size={18} />
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
