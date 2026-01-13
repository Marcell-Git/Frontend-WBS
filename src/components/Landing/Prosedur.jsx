import { FaSave, FaSearch, FaUpload } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";

const Prosedur = () => {
  const procedures = [
    {
      icon: <FaFileCircleCheck size={24} />,
      title: '1. Periksa Kelengkapan',
      desc: 'Periksa kelengkapan materi laporan Anda apakah telah sesuai dengan kriteria pelaporan (5W + 1H) yang ditetapkan.',
    },
    {
      icon: <FaUpload size={24} />,
      title: '2. Tulis & Kirim Laporan',
      desc: 'Klik menu "Ajukan Laporan", login akun Anda, lalu isi formulir pelaporan dengan detail dan sertakan bukti, kemudian kirim.',
    },
    {
      icon: <FaSave size={24} />,
      title: '3. Simpan Kode Laporan',
      desc: 'Setelah berhasil mengirim laporan, Anda akan mendapatkan Nomor Tiket/Kode Unik. Simpan dan jaga kerahasiaan kode tersebut.',
    },
    {
      icon: <FaSearch size={24} />,
      title: '4. Pantau Status',
      desc: 'Anda dapat melacak tindak lanjut laporan Anda kapan saja melalui menu "Lacak Laporan" menggunakan kode yang Anda simpan.',
    },
  ];
  return (
    <section id="prosedur" className="w-full py-20 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-blue-900 text-3xl lg:text-4xl font-bold">
            Prosedur Pelaporan
          </h2>

          <div className="mt-4 w-20 h-1.5 bg-blue-600 rounded-full" />

          <p className="mt-4 text-slate-500 text-lg font-normal max-w-2xl">
            Ikuti 4 langkah mudah berikut untuk menyampaikan laporan Anda secara
            terstruktur dan transparan.
          </p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {procedures.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              <div className="bg-blue-900 text-cyan-400 p-4 rounded-2xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-blue-900 text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prosedur;
