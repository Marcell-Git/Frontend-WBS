import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FaLock, FaUser, FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoArrowBackCircle } from 'react-icons/io5';

import LogoWBS from '../assets/LogoWBS.png';
import FloatingInput from '../components/Login/FloatingInput';

import { registerApi } from '../api/AuthApi';
import { getAllODPApi } from '../api/ODPApi';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nama_lengkap: '',
    id_unit: '',
  });
  const [dataODP, setDataODP] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllODPApi();
        setDataODP(result);
      } catch (error) {
        console.error('Error fetching ODP data:', error);
        toast.error('Gagal memuat data unit kerja');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.nama_lengkap ||
      !formData.id_unit
    ) {
      toast.error('Harap lengkapi semua formulir!');
      return;
    }

    setLoading(true);
    try {
      await registerApi(formData);
      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registrasi gagal, silakan coba lagi.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full border border-slate-200 relative py-8 px-4 md:px-10">
        <div className="flex justify-center mb-6">
          <img
            src={LogoWBS}
            alt="Logo WBS"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-950">
            Buat Akun Baru
          </h1>
          <p className="text-slate-500 mt-2">
            Lengkapi data diri Anda untuk memulai.
          </p>
        </div>

        <form onSubmit={handlerRegister} className="flex flex-col gap-5">
          <FloatingInput
            id="nama_lengkap"
            name="nama_lengkap"
            label="Nama Lengkap"
            type="text"
            icon={FaUser}
            value={formData.nama_lengkap}
            onChange={handleChange}
          />

          <div className="relative group">
            <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <FaBuilding size={18} />
            </div>
            <select
              id="id_unit"
              name="id_unit"
              value={formData.id_unit}
              onChange={handleChange}
              className="w-full bg-slate-50 rounded-xl border border-slate-200 px-12 py-3.5 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
            >
              <option value="">Pilih Unit Kerja (ODP)</option>
              {dataODP.map((odp) => (
                <option key={odp.id_unit} value={odp.id_unit}>
                  {odp.nama_unit}
                </option>
              ))}
            </select>
          </div>

          <FloatingInput
            id="username"
            name="username"
            label="Username"
            type="text"
            icon={FaUser}
            value={formData.username}
            onChange={handleChange}
          />

          <div className="relative">
            <FloatingInput
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={FaLock}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors z-10 p-1"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-950 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-900 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-blue-900/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <span>Memproses...</span> : 'Daftar Sekarang'}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 text-sm">
          <p className="text-slate-500">
            Sudah memiliki akun?{' '}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Masuk disini
            </Link>
          </p>

          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-blue-950 transition-colors font-medium mt-2"
          >
            <IoArrowBackCircle size={20} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
