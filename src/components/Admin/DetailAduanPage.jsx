import React from "react";
import { 
  FaUser, 
  FaBuilding, 
  FaClock, 
  FaFileAlt, 
  FaExclamationTriangle,
  FaPaperclip,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

// Komponen kecil untuk menampilkan item data agar kodingan tidak berulang
const DetailItem = ({ icon, label, value, isFullWidth = false }) => (
  <div className={`flex flex-col gap-1 ${isFullWidth ? "md:col-span-2" : ""}`}>
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-gray-900 font-medium text-base bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
      {value}
    </div>
  </div>
);

const DetailAduanPage = () => {
  return (
    <div className="bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">Detail Aduan</h1>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                #1234567890
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <FaClock size={12} />
              Diajukan pada 10 Mei 2024
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-semibold uppercase mb-1">Status Saat Ini</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700 ring-1 ring-inset ring-blue-600/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Sedang diverifikasi
            </span>
          </div>
        </div>

        {/* === CONTENT BODY === */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Row 1: Pelapor & ODP */}
            <DetailItem 
              icon={<FaUser />}
              label="Pelapor" 
              value="Ikan Mancing" 
            />
            <DetailItem 
              icon={<FaBuilding />}
              label="ODP / Unit Terkait" 
              value="Unit A - Dinas Perikanan" 
            />

            {/* Row 2: Subjek & Kasus */}
            <DetailItem 
              icon={<FaUser />}
              label="Subjek Terlapor" 
              value="John Doe (NIP: 19900101 202002 1 001)" 
            />
            <DetailItem 
              icon={<FaExclamationTriangle />}
              label="Kategori Kasus" 
              value="Pelanggaran Kode Etik" 
            />

            {/* Row 3: Waktu Kejadian */}
            <DetailItem 
              icon={<FaClock />}
              label="Waktu Kejadian" 
              value="10 Maret 2022, Pukul 10.10 WIB" 
            />

            {/* Row 4: Kronologi (Full Width) */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaFileAlt className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Kronologi Kejadian</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-700 leading-relaxed text-justify">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

            {/* Row 5: Bukti Pendukung (Full Width) */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaPaperclip className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Bukti Pendukung</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* File Item 1 */}
                <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all group">
                  <div className="bg-red-100 p-3 rounded-lg text-red-600 group-hover:bg-white group-hover:text-red-500 transition-colors">
                    <FaFileAlt size={20} />
                  </div>
                  <div className="ml-4 overflow-hidden">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 truncate">bukti_foto_kejadian.jpg</p>
                    <p className="text-xs text-gray-400">JPG • 2.4 MB</p>
                  </div>
                </a>

                {/* File Item 2 */}
                <a href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all group">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-white group-hover:text-blue-500 transition-colors">
                    <FaFileAlt size={20} />
                  </div>
                  <div className="ml-4 overflow-hidden">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 truncate">dokumen_laporan_resmi.pdf</p>
                    <p className="text-xs text-gray-400">PDF • 1.2 MB</p>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* === FOOTER ACTIONS === */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 hover:border-red-300 transition-all focus:ring-2 focus:ring-red-200"
          >
            <FaTimesCircle />
            Tolak Aduan
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all focus:ring-2 focus:ring-blue-300 transform active:scale-95"
          >
            <FaCheckCircle />
            Tindak Lanjut Aduan
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailAduanPage;