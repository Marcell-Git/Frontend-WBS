import {
  FaUser,
  FaBuilding,
  FaClock,
  FaFileAlt,
  FaExclamationTriangle,
  FaPaperclip,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { detailAduanApi, updateStatusAduanApi } from '../../../api/AduanApi';
import DOMPurify from 'dompurify';
import { getFileUrl } from '../../../api/useAxios';

const DetailItem = ({ icon, label, value, isFullWidth = false }) => (
  <div className={`flex flex-col gap-1 ${isFullWidth ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="text-xs font-semibold uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="text-gray-900 font-medium text-base bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
      {value}
    </div>
  </div>
);

const DetailAduanPage = () => {
  const { id_aduan } = useParams();
  const navigate = useNavigate();

  const [aduanDetail, setAduanDetail] = useState(null);

  useEffect(() => {
    if (!id_aduan) return;

    const fetchData = async () => {
      const res = await detailAduanApi(id_aduan);
      setAduanDetail(res.data);
    };

    fetchData();
  }, [id_aduan]);

  const handlerUpdateStatus = async (status) => {
    if (!id_aduan) return;
    await updateStatusAduanApi(id_aduan, status);
    const res = await detailAduanApi(id_aduan);
    setAduanDetail(res.data);
    toast.success('Status aduan berhasil diperbarui');
    navigate('/admin/aduan');
  };

  if (!aduanDetail) {
    return <div></div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const statusStyles = {
    'Sedang diverifikasi': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      ring: 'ring-blue-600/20',
      dot: 'bg-blue-500',
    },
    'Sedang diproses': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      ring: 'ring-yellow-600/20',
      dot: 'bg-yellow-500',
    },
    'Proses penyidikan': {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      ring: 'ring-purple-600/20',
      dot: 'bg-purple-500',
    },
    'Aduan selesai': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      ring: 'ring-green-600/20',
      dot: 'bg-green-500',
    },
    'Aduan ditolak': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      ring: 'ring-red-600/20',
      dot: 'bg-red-500',
    },
  };

  const updateStatus = {
    'Sedang diverifikasi': {
      text: 'Tindak Lanjut Aduan',
      newStatus: 'Sedang diproses',
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      ring: 'focus:ring-blue-300',
    },
    'Sedang diproses': {
      text: 'Lanjutkan Penyidikan',
      newStatus: 'Proses penyidikan',
      bg: 'bg-yellow-600',
      hover: 'hover:bg-yellow-700',
      ring: 'focus:ring-yellow-300',
    },
    'Proses penyidikan': {
      text: 'Selesaikan Aduan',
      newStatus: 'Aduan selesai',
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      ring: 'focus:ring-purple-300',
    },
  };
  return (
    <div className="bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">Detail Aduan</h1>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                #{aduanDetail?.id_aduan}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <FaClock size={12} />
              Diajukan pada {formatDate(aduanDetail?.created_at)}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-semibold uppercase mb-1">
              Status Saat Ini
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full ${statusStyles[aduanDetail?.status_aduan]?.bg} px-4 py-1.5 text-sm font-bold ${statusStyles[aduanDetail?.status_aduan]?.text} ring-1 ring-inset ${statusStyles[aduanDetail?.status_aduan]?.ring}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${statusStyles[aduanDetail?.status_aduan]?.dot} animate-pulse`}
              ></span>
              {aduanDetail?.status_aduan}
            </span>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailItem
              icon={<FaUser />}
              label="Pelapor"
              value={aduanDetail?.nama_pengadu}
            />
            <DetailItem
              icon={<FaBuilding />}
              label="ODP / Unit Terkait"
              value={aduanDetail?.nama_unit}
            />

            <DetailItem
              icon={<FaUser />}
              label="Subjek Terlapor"
              value={aduanDetail?.subjek_pelaku}
            />
            <DetailItem
              icon={<FaExclamationTriangle />}
              label="Kategori Kasus"
              value={aduanDetail?.nama_kategori}
            />

            <DetailItem
              icon={<FaClock />}
              label="Waktu Kejadian"
              value={formatDate(aduanDetail?.waktu_kejadian)}
            />

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaFileAlt className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Kronologi Kejadian
                </span>
              </div>
              <div
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(aduanDetail?.kronologi),
                }}
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <FaPaperclip className="text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Bukti Pendukung
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aduanDetail?.bukti_aduan.map((bukti, index) => (
                  <a
                    key={index}
                    href={getFileUrl(bukti.file_path)}
                    target="_blank"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all group"
                  >
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-white group-hover:text-blue-500 transition-colors">
                      <FaFileAlt size={20} />
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 truncate">
                        {bukti.nama_file}
                      </p>
                      <p className="text-xs text-gray-400">
                        {bukti.jenis_file} •{' '}
                        {(bukti.ukuran / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
          {aduanDetail.status_aduan !== 'Aduan selesai' &&
            aduanDetail.status_aduan !== 'Aduan ditolak' && (
              <>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 hover:border-red-300 transition-all focus:ring-2 focus:ring-red-200"
                  onClick={() => handlerUpdateStatus('Aduan ditolak')}
                >
                  <FaTimesCircle />
                  Tolak Aduan
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg ${updateStatus[aduanDetail.status_aduan].bg} text-white font-medium ${updateStatus[aduanDetail.status_aduan].hover} shadow-md hover:shadow-lg transition-all focus:ring-2 ${updateStatus[aduanDetail.status_aduan].ring} transform active:scale-95`}
                  onClick={() =>
                    handlerUpdateStatus(
                      updateStatus[aduanDetail.status_aduan].newStatus,
                    )
                  }
                >
                  <FaCheckCircle />
                  {updateStatus[aduanDetail.status_aduan].text}
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default DetailAduanPage;