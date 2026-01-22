import { MdClose, MdCheckCircle } from 'react-icons/md';
import { AlertTriangle } from 'lucide-react';

const KonfirmasiModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  data,
  kategoriList,
  unitList,
}) => {
  if (!isOpen) return null;

  const getKategoriName = (id) =>
    kategoriList.find((k) => String(k.id_kategori) === String(id))
      ?.nama_kategori || '-';
  const getUnitName = (id) =>
    unitList.find((u) => String(u.id_unit) === String(id))?.nama_unit || '-';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800">
            <AlertTriangle className="text-yellow-500" size={24} />
            <h3 className="text-lg font-bold">Konfirmasi Pengiriman</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Mohon periksa kembali data Anda sebelum mengirim. Apakah data
            berikut sudah benar?
          </p>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-gray-500 font-medium">Judul Kasus</span>
              <span className="col-span-2 text-gray-800 font-semibold">
                {data.nama_kasus}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-gray-500 font-medium">Kategori</span>
              <span className="col-span-2 text-gray-800">
                {getKategoriName(data.id_kategori)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-gray-500 font-medium">Unit Terkait</span>
              <span className="col-span-2 text-gray-800">
                {getUnitName(data.id_unit)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-gray-500 font-medium">Terlapor</span>
              <span className="col-span-2 text-gray-800">
                {data.subjek_pelaku || '-'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-gray-500 font-medium">Waktu</span>
              <span className="col-span-2 text-gray-800">
                {data.waktu_kejadian
                  ? new Date(data.waktu_kejadian).toLocaleString('id-ID', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })
                  : '-'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm border-t border-blue-200 pt-2 mt-2">
              <span className="text-gray-500 font-medium">File</span>
              <span className="col-span-2 text-blue-700 font-medium">
                {data.file ? data.file.length : 0} Dokumen dilampirkan
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500 italic">
            * Dengan mengirim aduan ini, Anda menyatakan bahwa informasi yang
            diberikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-white hover:text-gray-900 transition-colors"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Mengirim...' : 'Ya, Kirim Sekarang'}
            {!isSubmitting && <MdCheckCircle size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiModal;
