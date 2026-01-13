import LogoWBS from '../assets/LogoWBS.png';
import LoginImage from '../assets/LoginImage.svg';
import FloatingInput from '../components/Login/FloatingInput';
import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      {/* Container Utama (Card) */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Bagian Kiri: Gambar & Logo */}
        {/* 'hidden md:flex' opsional: jika di HP ingin gambar disembunyikan agar hemat tempat */}
        <div className="w-full md:w-1/2 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative">
          {/* Logo diposisikan absolute di pojok kiri atas atau statis di atas gambar */}
          <div className="w-full flex justify-start mb-6">
            <img src={LogoWBS} alt="Logo WBS" className="h-10 w-auto" />
          </div>

          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full max-w-xs object-contain drop-shadow-md"
          />
        </div>

        {/* Bagian Kanan: Form */}
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
            <FloatingInput id="username" label="Username" icon={FaUser} />

            <FloatingInput
              id="password"
              label="Password"
              type="password"
              icon={FaLock}
            />

            {/* Tombol Login Full Width */}
            <button
              type="button"
              className="mt-4 w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>

          {/* Tombol Kembali */}
          <div className="mt-6 flex justify-center">
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
