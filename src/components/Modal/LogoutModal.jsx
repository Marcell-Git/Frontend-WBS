import { LogOut, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all scale-100 relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <LogOut className="w-8 h-8 text-red-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Keluar Website?
        </h3>
        <p className="text-gray-500 text-sm mb-8">
          Apakah Anda yakin ingin logout? Anda harus login kembali untuk mengakses akun Anda.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;