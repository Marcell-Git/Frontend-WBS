import { FaCircle, FaClock, FaFile, FaMapMarkedAlt, FaQuestionCircle, FaScroll, FaUser } from "react-icons/fa";
import { FaLock, FaShield } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { LuListChecks } from "react-icons/lu";

import LandingImage2 from "../../assets/LandingImage2.svg";

const Tentang = () => {
  return (
    <section id="tentang" className="w-full py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 space-y-20">
        <div className="flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-blue-900 text-3xl lg:text-4xl font-bold">
              Tentang Whistleblowing System
            </h2>
            <div className="mt-4 w-20 h-1.5 bg-blue-600 rounded-full mx-auto" />
            <p className="mt-6 text-slate-500 text-lg lg:text-xl font-normal leading-relaxed">
              Mekanisme pelaporan internal untuk mengungkap pelanggaran dan
              menjaga integritas institusi.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/3 flex justify-center">
              <img
                src={LandingImage2}
                alt="Tentang WBS"
                className="w-3/4 lg:w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-slate-50 border border-slate-100 px-8 py-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-800 bg-clip-text text-transparent mb-6">
                  Apa itu Whistleblowing System?
                </h3>

                <div className="text-slate-700 text-base lg:text-lg leading-relaxed space-y-4 text-justify">
                  <p>
                    <strong>
                      Whistleblowing System (WBS) Kabupaten Klaten
                    </strong>{' '}
                    adalah sistem pelaporan internal yang disediakan khusus bagi{' '}
                    <span className="text-blue-700 font-semibold">
                      Aparatur Sipil Negara (ASN)
                    </span>{' '}
                    untuk menyampaikan dugaan pelanggaran, penyimpangan, atau
                    tindakan tidak etis.
                  </p>
                  <p>
                    Sistem ini hadir sebagai wujud komitmen dalam membangun{' '}
                    <strong>
                      budaya transparansi, akuntabilitas, dan tata kelola
                      pemerintahan yang baik
                    </strong>
                    . Melalui WBS, ASN diberikan saluran pelaporan yang{' '}
                    <span className="bg-blue-100 text-blue-800 px-1 rounded">
                      aman, terpercaya, dan rahasia
                    </span>
                    , sehingga dapat melapor tanpa rasa takut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-200 transition-colors h-full">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                <LuListChecks size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Unsur Aduan (5W + 1H)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: FaQuestionCircle,
                  label: 'What',
                  desc: 'Perbuatan yang diindikasi.',
                },
                {
                  icon: FaUser,
                  label: 'Who',
                  desc: 'Siapa yang terlibat.',
                },
                {
                  icon: FaMapMarkedAlt,
                  label: 'Where',
                  desc: 'Lokasi kejadian.',
                },
                { icon: FaClock, label: 'When', desc: 'Waktu kejadian.' },
                { icon: FaScroll, label: 'How', desc: 'Modus perbuatan.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:bg-blue-50 transition-colors"
                >
                  <div className="mt-1 text-blue-500 group-hover:text-blue-600">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800 text-sm">
                      {item.label}
                    </span>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-red-200 transition-colors h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl">
                <GoAlertFill size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Jenis Pelanggaran
              </h3>
            </div>

            <div className="flex-grow space-y-3">
              {[
                'Korupsi, Kolusi, Nepotisme (KKN)',
                'Pelanggaran Kode Etik',
                'Penyalahgunaan Wewenang Jabatan',
                'Pelanggaran Terhadap Standar Pelayanan',
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:bg-red-50 hover:border-red-100 hover:shadow-sm transition-all"
                >
                  <FaCircle className="text-red-400 min-w-[6px]" size={8} />
                  <p className="font-medium text-gray-700 text-sm sm:text-base">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400 italic text-right">
              *Bukti pendukung (foto/dokumen) sangat disarankan.
            </p>
          </div>
        </div>

        <div className="bg-slate-100 rounded-[3rem] p-8 lg:p-16 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-blue-900 text-3xl font-bold mb-4">
              Kerahasiaan & Perlindungan Pelapor
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 text-lg">
              Prioritas kami adalah keamanan Anda. Kami menjamin perlindungan
              penuh bagi setiap pelapor yang beritikad baik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <FaLock size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Identitas Anonim
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Identitas Anda wajib dicantumkan namun akan{' '}
                <strong>dianonimkan</strong> secara sistematis dalam proses
                penanganan untuk melindungi privasi Anda.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaShield size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Jaminan Perlindungan
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Pelapor dilindungi hukum dari segala bentuk ancaman, intimidasi,
                atau tindakan balasan administratif maupun fisik.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <FaFile size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Data Terenkripsi
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Semua data laporan disimpan dalam server dengan keamanan tinggi
                dan hanya dapat diakses oleh tim khusus yang berwenang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tentang;