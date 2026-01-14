import { FaCalendarAlt, FaClock, FaFileImage, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const LacakLaporanPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-start w-full px-4">
        <div
          className="
              relative 
              mt-20 md:mt-32 lg:mt-32
              w-full max-w-md 
              bg-white 
              rounded-2xl 
              shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
              border border-black/10 
              p-6 sm:p-8 
              flex flex-col gap-6
            "
        >
          <div className="flex gap-3 items-center border-b border-gray-100 pb-4">
            <FaSearch className="text-blue-950 text-xl" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Cek Status Laporan
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="nomor_aduan"
              className="block text-sm font-semibold text-gray-700 ml-1"
            >
              Nomor Aduan
            </label>

            <input
              type="text"
              id="nomor_aduan"
              placeholder="Contoh: ADU-2024-001"
              required
              className="
                  block w-full 
                  rounded-xl 
                  border border-gray-300 
                  bg-gray-50 
                  px-4 py-3 
                  text-gray-900 
                  shadow-sm 
                  placeholder:text-gray-400 
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none
                  transition-all duration-200
                "
            />
          </div>

          <div>
            <button
              type="submit"
              className="
                  w-full 
                  bg-blue-950 hover:bg-blue-900 
                  text-white font-bold 
                  py-3.5 px-4 
                  rounded-xl 
                  transition duration-300 
                  shadow-md hover:shadow-lg hover:-translate-y-0.5
                  flex justify-center items-center gap-2
                "
            >
              <span>Cari Laporan</span>
              <FaSearch className="text-sm opacity-70" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mb-10 px-4">
        <div
          className="
              relative 
              mt-6
              w-full  
              bg-white 
              rounded-2xl 
              shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] 
              border border-gray-200 
              overflow-hidden
            "
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 border-b border-gray-100 p-6 sm:p-8 bg-gray-50/50">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Nomor Aduan
              </div>
              <span className="text-2xl font-bold text-blue-950">
                ADU-2024-001
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mb-1">
                <FaCalendarAlt /> <span>10 Mei 2024</span>
              </div>

              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 ring-1 ring-inset ring-blue-700/10">
                Sedang diverifikasi
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Nama kasus
              </div>

              <div className="text-gray-900 font-medium">
                Jalan Rusak di Desa A
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Waktu Kejadian
              </div>

              <div className="text-gray-900 font-medium flex items-center gap-2">
                <FaClock className="text-gray-400" /> 10 Mei 2024, 14:30 WIB
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Kategori Aduan
              </div>

              <div className="text-gray-900 font-medium">
                Pelanggaran Kode Etik
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Kronologi Kejadian
              </div>

              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                Saya melihat lubang besar di tengah jalan utama yang menyebabkan
                kemacetan dan membahayakan pengendara motor. Lubang tersebut
                sudah ada sejak 3 hari yang lalu akibat hujan deras. Mohon
                segera ditindaklanjuti.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Dokumen Pendukung
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 cursor-pointer transition">
                  <FaFileImage className="text-red-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    Foto_Bukti_1.jpg
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 cursor-pointer transition">
                  <FaFileImage className="text-red-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    Foto_Bukti_2.jpg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LacakLaporanPage;
