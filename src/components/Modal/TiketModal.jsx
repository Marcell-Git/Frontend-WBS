import React, { useState } from 'react';
import { CheckCircle, Copy, X } from 'lucide-react';

const TiketModal = ({ isOpen, onClose, ticketId }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative text-center p-8 transform scale-100 transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500"
        >
          <X size={20} />
        </button>

        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Aduan Terkirim!
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Laporan Anda telah masuk ke sistem kami. Silakan simpan nomor tiket di
          bawah ini untuk memantau status aduan Anda.
        </p>

        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 mb-8 relative group">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
            Nomor Tiket Anda
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-mono font-bold text-blue-600 tracking-wider select-all">
              {ticketId || 'Loading...'}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="mt-3 flex items-center justify-center gap-2 w-full text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            {copied ? (
              <span className="text-green-600 flex items-center gap-1">
                Tersalin <CheckCircle size={14} />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy size={14} /> Salin Kode
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all transform active:scale-95"
        >
          Saya Sudah Simpan
        </button>
      </div>
    </div>
  );
};

export default TiketModal;
