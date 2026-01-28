import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FaArrowLeft, FaUser, FaBuilding, FaIdCard } from 'react-icons/fa';

import { detailUserApi } from '../../../api/UserApi';
import { updatePasswordApi } from '../../../api/UserApi';

import UpdatePasswordModal from '../../Modal/UpdatePasswordModal';

const RoleBadge = ({ role }) => {
  const styles = {
    admin: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    user: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${styles[role] || styles.default}`}
    >
      {role}
    </span>
  );
};

const DetailAkunPage = () => {
  const { id_user } = useParams();
  const navigate = useNavigate();
  const [akunDetail, setAkunDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAkunDetail = async () => {
      if (!id_user) return;
      setLoading(true);
      try {
        const res = await detailUserApi(id_user);
        setAkunDetail(res.data || res);
      } catch (error) {
        console.error('Gagal mengambil detail user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAkunDetail();
  }, [id_user]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handlePasswordUpdate = async (newPassword) => {
    await updatePasswordApi(id_user, newPassword);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">
          Memuat profil pengguna...
        </p>
      </div>
    );
  }

  if (!akunDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            User Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-6">
            Data pengguna dengan ID tersebut tidak tersedia atau telah dihapus.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-medium hover:underline"
          >
            &larr; Kembali ke Daftar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans">
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FaArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Kembali ke Daftar Akun
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        </div>

        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-8 mb-6 text-center sm:text-left">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center text-2xl font-bold text-indigo-600 bg-gradient-to-br from-indigo-50 to-indigo-100">
                {getInitials(akunDetail.nama_lengkap)}
              </div>
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {akunDetail.nama_lengkap}
              </h1>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaUser className="mr-1.5 text-gray-400" />@
                  {akunDetail.username}
                </span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <RoleBadge role={akunDetail.role} />
              </div>
            </div>

            <div className="mt-6 sm:mt-0 flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Update Password
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <FaIdCard className="text-indigo-500" />
                Informasi Akun
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    Username
                  </label>
                  <p className="text-gray-900 font-medium mt-1">
                    {akunDetail.username}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    Role Akses
                  </label>
                  <div className="mt-1">
                    <span className="text-gray-700 text-sm font-medium capitalize">
                      {akunDetail.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <FaBuilding className="text-indigo-500" />
                Organisasi & Pekerjaan
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    Unit Kerja
                  </label>
                  <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                    {akunDetail.nama_unit || '-'}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">
                    Nama Lengkap
                  </label>
                  <p className="text-gray-900 font-medium mt-1">
                    {akunDetail.nama_lengkap}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={akunDetail.username}
        onSave={handlePasswordUpdate}
      />
    </div>
  );
};

export default DetailAkunPage;
