import { MdAccessTime, MdSend } from 'react-icons/md';
import Navbar from '../components/Navbar';
import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AduanPage = () => {

    const [kronologi, setKronologi] = useState('');

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
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 mt-20 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Input Aduan Baru</h1>
          <p className="text-gray-500 mt-2">Silakan lengkapi formulir di bawah ini dengan data yang valid.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="kategori-aduan" className="text-sm font-semibold text-gray-700">
                  Kategori Aduan <span className="text-red-500">*</span>
                </label>
                <select
                  id="kategori-aduan"
                  name="kategori-aduan"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Korupsi, Kolusi, Nepotisme (KKN)">Korupsi, Kolusi, Nepotisme (KKN)</option>
                  <option value="Pelanggaran Kode Etik">Pelanggaran Kode Etik</option>
                  <option value="Penyalahgunaan Wewenang Jabatan">Penyalahgunaan Wewenang Jabatan</option>
                  <option value="Pelanggaran Terhadap Standar Pelayanan">Pelanggaran Terhadap Standar Pelayanan</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="kasus" className="text-sm font-semibold text-gray-700">
                  Judul Kasus <span className="text-red-500">*</span>
                </label>
                <input
                  id="kasus"
                  name="kasus"
                  type="text"
                  placeholder="Contoh: Keterlambatan Layanan..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="odp" className="text-sm font-semibold text-gray-700">
                  ODP (Unit Terkait)
                </label>
                <select
                  id="odp"
                  name="odp"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">-- Pilih Unit --</option>
                  <option value="unit_a">Unit A</option>
                  <option value="unit_b">Unit B</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="waktu" className="text-sm font-semibold text-gray-700">
                  Waktu Kejadian
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                    <MdAccessTime size={20} />
                  </div>
                  <input
                    id="waktu"
                    name="waktu"
                    type="datetime-local"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="subjek-pelaku" className="text-sm font-semibold text-gray-700">
                  Subjek Pelaku (Terlapor)
                </label>
                <input
                  id="subjek-pelaku"
                  name="subjek-pelaku"
                  type="text"
                  placeholder="Nama orang atau divisi yang dilaporkan"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="kronologi" className="text-sm font-semibold text-gray-700">
                  Kronologi Kejadian <span className="text-red-500">*</span>
                </label>
                
                <div className="bg-white">
                  <ReactQuill 
                    theme="snow" 
                    value={kronologi} 
                    onChange={setKronologi} 
                    modules={modules}
                    formats={formats}
                    placeholder="Ceritakan detail kejadian secara lengkap (Anda bisa menebalkan teks penting)..."
                    className="h-64 mb-12" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="dokumen-pendukung" className="text-sm font-semibold text-gray-700">
                  Dokumen Pendukung
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dokumen-pendukung" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (MAX. 5MB)</p>
                    </div>
                    <input id="dokumen-pendukung" type="file" className="hidden" />
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
    </div>
  );
};

export default AduanPage;