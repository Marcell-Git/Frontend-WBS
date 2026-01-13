import Navbar from '../components/navbar';
import LandingImage1 from '../assets/LandingImage1.svg';
import LandingImage2 from '../assets/LandingImage2.svg';
import { LuListChecks } from 'react-icons/lu';
import {
  FaCircle,
  FaClock,
  FaLock,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaScroll,
  FaUser,
} from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go';
import { FaShield, FaFile } from 'react-icons/fa6';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-[800px] bg-gradient-to-b from-blue-900 to-white">
          <section id='beranda' className="flex items-center gap-3 w-fit justify-center mx-auto pt-40 px-6">
            <div className="flex flex-col gap-2">
              <div className="justify-start text-white text-5xl font-bold">
                Whistleblowing System
              </div>
              <div className="justify-start text-blue-950 text-6xl font-bold">
                Kabupaten Klaten
              </div>
              <div className="w-fit justify-start text-white text-l font-bold">
                Wadah Laporan Aman untuk Mewujudkan Pemerintahan yang Bersih dan
                Berintegritas
              </div>
              <button className="w-fit bg-blue-900 text-white text-base font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-blue-800 transition-colors">
                Ajukan Laporan Sekarang
              </button>
            </div>

            <img
              src={LandingImage1}
              alt="Landing"
              className="ml-auto w-[35%] h-auto"
            />
          </section>

          <div className="flex flex-col items-center pt-52 px-6">
            <section id="tentang" className="text-blue-900 text-4xl font-bold text-center">
              Tentang Whistleblowing System
            </section>
            <div className="mt-3 w-16 h-1 bg-blue-600 rounded-xl" />
            <div className="pt-6 justify-start text-stone-500 text-lg font-normal">
              Mekanisme pelaporan internal untuk mengungkap pelanggaran dan
              menjaga integritas institusi
            </div>
          </div>
        </div>

        <div className="flex items-center w-fit justify-center mx-auto pt-4 px-6 gap-10">
          <img
            src={LandingImage2}
            alt="Landing"
            className="ml-auto w-[30%] h-auto"
          />

          <div className="flex flex-col items-start">
            <div className="bg-slate-200 px-8 py-6 rounded-2xl inline-block max-w-3xl hover:shadow-md transition-shadow">
              <h1 className="pt-4 pb-4 text-3xl font-bold bg-gradient-to-r from-cyan-700 to-slate-900 bg-clip-text text-transparent">
                Apa itu Whistleblowing System ?
              </h1>

              <p className="text-stone-900 text-l leading-relaxed">
                <strong>Whistleblowing System (WBS) Kabupaten Klaten</strong>{' '}
                adalah sistem pelaporan internal yang disediakan khusus bagi{' '}
                <strong>Aparatur Sipil Negara (ASN)</strong> untuk menyampaikan
                dugaan pelanggaran, penyimpangan, atau tindakan tidak etis yang
                terjadi di lingkungan Pemerintah Kabupaten Klaten.
                <br />
                <br />
                Sistem ini hadir sebagai wujud komitmen dalam membangun{' '}
                <strong>
                  budaya transparansi, akuntabilitas, dan tata kelola
                  pemerintahan yang baik (good governance)
                </strong>
                . Melalui WBS, ASN diberikan{' '}
                <strong>
                  saluran pelaporan yang aman, terpercaya, dan menjamin
                  kerahasiaan
                </strong>
                , sehingga setiap pelapor dapat menyampaikan informasi secara
                berani dan bertanggung jawab tanpa rasa khawatir.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                  <LuListChecks size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Unsur Aduan (5W + 1H)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: FaQuestionCircle,
                    label: 'What',
                    desc: 'Perbuatan yang diindikasi.',
                  },
                  { icon: FaUser, label: 'Who', desc: 'Siapa yang terlibat.' },
                  {
                    icon: FaMapMarkedAlt,
                    label: 'Where',
                    desc: 'Di mana lokasi kejadian.',
                  },
                  { icon: FaClock, label: 'When', desc: 'Waktu kejadian.' },
                  {
                    icon: FaScroll,
                    label: 'How',
                    desc: 'Modus perbuatan dilakukan.',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="mt-0.5 text-blue-500">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-800 text-sm">
                        {item.label}
                      </span>
                      <p className="text-xs text-gray-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-red-50 text-red-600 p-2.5 rounded-xl">
                  <GoAlertFill size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Jenis Pelanggaran
                </h2>
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
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors cursor-default"
                  >
                    <FaCircle className="text-red-400" size={6} />
                    <p className="font-medium text-gray-700 text-sm">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">
                  *Bukti pendukung sangat disarankan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-200 pb-10 px-44">
          <div className="flex flex-col items-center pt-10 px-6">
            <h2 className="text-blue-900 text-4xl font-bold text-center">
              Kerahasiaan & Perlindungan Pelapor
            </h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 rounded-xl" />
            <div className="pt-6 justify-start text-stone-500 text-lg font-normal">
              Kami menjamin keamanan dan perlindungan penuh bagi setiap pelapor
            </div>
          </div>

          <div className="flex items-center w-fit justify-center mx-auto pt-4 px-6 gap-10 ">
            <div className="bg-white px-6 py-6 rounded-2xl h-[50%] border border-black/20 hover:shadow-md transition-shadow">
              <div className="bg-cyan-200 text-cyan-600 p-2.5 rounded-xl w-12 h-12">
                <FaLock size={24} />
              </div>

              <h2 className="text-blue-900 text-xl font-semibold pb-3 pt-5">
                Identitas Dianonimkan
              </h2>

              <p>
                Identitas Anda wajib dicantumkan namun akan dianonimkan dalam
                proses penanganan untuk melindungi privasi dan keamanan Anda.
              </p>
            </div>

            <div className="bg-white px-6 py-6 rounded-2xl h-[50%] border border-black/20 hover:shadow-md transition-shadow">
              <div className="bg-green-300 text-green-600 p-2.5 rounded-xl w-12 h-12">
                <FaShield size={24} />
              </div>

              <h2 className="text-blue-900 text-xl font-semibold pb-3 pt-5">
                Perlindungan Pelapor
              </h2>

              <p>
                Pelapor dilindungi dari segala bentuk tindakan balasan,
                intimidasi, atau diskriminasi sesuai peraturan perundangan yang
                berlaku.
              </p>
            </div>

            <div className="bg-white px-6 py-6 rounded-2xl h-[50%] border border-black/20 hover:shadow-md transition-shadow">
              <div className="bg-cyan-200 text-sky-600 p-2.5 rounded-xl w-12 h-12">
                <FaFile size={24} />
              </div>

              <h2 className="text-blue-900 text-xl font-semibold pb-3 pt-5">
                Penanganan Data Aman
              </h2>

              <p>
                Semua data laporan ditangani dengan sistem keamanan tinggi dan
                hanya diakses oleh unit berwenang yang telah ditunjuk.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-10 px-6">
          <section id='prosedur' className="scroll-mt-32 text-blue-900 text-4xl font-bold text-center">
            Prosedur Pelaporan
          </section>
          <div className="mt-3 w-16 h-1 bg-blue-600 rounded-xl" />
          <div className="pt-6 justify-start text-stone-500 text-lg font-normal">
            Proses pelaporan yang terstruktur dan transparan
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
