import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Bantuan = () => {
  return (
    <section id="bantuan" className="w-full py-20 bg-slate-200 scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* === HEADER SECTION === */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-blue-900 text-3xl lg:text-4xl font-bold">
            Butuh Bantuan?
          </h2>
          <div className="mt-4 w-20 h-1.5 bg-blue-600 rounded-full" />
          <p className="mt-4 text-slate-500 text-lg font-normal">
            Tim kami siap membantu Anda jika mengalami kendala dalam proses
            pelaporan.
          </p>
        </div>

        {/* === KARTU KONTAK UTAMA === */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-300/50 hover:shadow-xl transition-shadow duration-300 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 group">
              <div className="bg-blue-900 text-cyan-400 p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                <FaPhone size={28} />
              </div>
              <div>
                <h3 className="text-blue-900 text-xl font-bold mb-2">
                  Hotline Pengaduan
                </h3>
                <p className="text-slate-600 font-medium text-lg">
                  0812-3456-7890
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Senin - Jumat, 08.00 - 16.00 WIB
                </p>
              </div>
            </div>

            {/* 2. Email */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 group">
              <div className="bg-blue-900 text-cyan-400 p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                <MdEmail size={28} />
              </div>
              <div>
                <h3 className="text-blue-900 text-xl font-bold mb-2">
                  Email Resmi
                </h3>
                <p className="text-slate-600 font-medium text-lg">
                  inspektorat@klaten.go.id
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Respon maksimal 1x24 jam
                </p>
              </div>
            </div>

            {/* 3. Alamat */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 group">
              <div className="bg-blue-900 text-cyan-400 p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                <FaLocationDot size={28} />
              </div>
              <div>
                <h3 className="text-blue-900 text-xl font-bold mb-2">
                  Alamat Kantor
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Inspektorat Kabupaten Klaten <br />
                  Jl. Pemuda No. 1, Klaten, <br />
                  Jawa Tengah 57411
                </p>
              </div>
            </div>
          </div>

          {/* Garis Pemisah */}
          <div className="w-full h-px bg-slate-200 my-10" />

          {/* === FOOTER NOTE === */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="text-yellow-600 min-w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-slate-700">
              <span className="font-bold text-slate-900">
                Catatan Penting:{' '}
              </span>
              Untuk menjaga kerahasiaan dan keamanan data, disarankan melakukan
              pelaporan
              <span className="font-semibold text-blue-600">
                {' '}
                hanya melalui formulir online
              </span>{' '}
              website ini. Kontak di atas hanya untuk konsultasi teknis atau
              informasi umum.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bantuan;
