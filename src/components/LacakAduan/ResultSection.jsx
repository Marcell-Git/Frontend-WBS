import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import StatusBadge from '../StatusBadge';

import DOMPurify from 'dompurify';

const ResultSection = ({ dataForm, formatDate }) => {
  return (
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
              Kode Aduan
            </div>
            <span className="text-2xl font-bold text-blue-950">
              {dataForm.kode_tiket || '-'}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mb-1">
              <FaCalendarAlt />{' '}
              <span>
                {dataForm.created_at ? formatDate(dataForm.created_at) : '-'}
              </span>
            </div>

            <StatusBadge status={dataForm.status_aduan || '-'} />
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Nama kasus
            </div>

            <div className="text-gray-900 font-medium">
              {dataForm.nama_kasus || '-'}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">
              Waktu Kejadian
            </div>

            <div className="text-gray-900 font-medium flex items-center gap-2">
              <FaClock className="text-gray-400" />{' '}
              {dataForm.waktu_kejadian
                ? new Date(dataForm.waktu_kejadian).toLocaleString('id-ID', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })
                : '-'}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">
              Kategori Aduan
            </div>

            <div className="text-gray-900 font-medium">
              {dataForm.nama_kategori || '-'}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Kronologi Kejadian
            </div>

            <div
              className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataForm?.kronologi),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
