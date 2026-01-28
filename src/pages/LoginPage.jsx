import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import { IoArrowBackCircle } from 'react-icons/io5';

import LogoWBS from '../assets/LogoWBS.png';
import LoginImage from '../assets/LoginImage.svg';

import FloatingInput from '../components/Login/FloatingInput';

import { useAuth } from '../context/AuthContext';
import { loginApi } from '../api/AuthApi';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      toast.error('Username dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);

      const res = await loginApi(formData);

      login(res.access_token, res.user);

      toast.success('Login berhasil');

      if (res.user.role === 'admin') {
        navigate('/admin/aduan', { replace: true });
        return;
      } else {
        navigate('/aduan', { replace: true });
        return;
      }
    } catch (err) {
      if (err.response?.status === 429) {
        toast.warning('Terlalu banyak percobaan, coba lagi nanti');
      } else {
        toast.error(err.response?.data?.message || 'Login gagal');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
          <div className="w-full flex justify-start mb-6">
            <img src={LogoWBS} alt="Logo WBS" className="h-10 w-auto" />
          </div>

          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full max-w-xs object-contain drop-shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">
              Login
            </h1>

            <p className="text-slate-500 text-sm">
              Masuk untuk melaporkan dugaan pelanggaran
            </p>
          </div>

          <form className="flex flex-col gap-2">
            <FloatingInput
              id="username"
              label="Username"
              icon={FaUser}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <div className="relative">
              <FloatingInput
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={FaLock}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-4 w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm font-medium">
            <span>belum punya akun? </span>
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:text-blue-900"
            >
              Daftar sekarang
            </Link>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-500 hover:text-blue-950 transition-colors text-sm font-medium"
            >
              <IoArrowBackCircle className="text-xl" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
