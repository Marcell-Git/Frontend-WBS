import logoWBS from '../assets/logoWBS.png';

const Footer = () => {
  return (
    <footer className="bg-blue-900 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          {/* BAGIAN KIRI: Logo & Deskripsi */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <img
              src={logoWBS}
              alt="Logo WBS Kabupaten Klaten"
              className="h-16 w-auto mb-4" 
            />
            <p className="text-blue-200 text-sm leading-relaxed">
              Wadah Laporan Aman untuk Mewujudkan Pemerintahan yang Bersih,
              Transparan, dan Berintegritas di Kabupaten Klaten.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">
              Kontak Kami
            </h2>

            <div className="space-y-2 text-blue-200 text-sm">
              <p className="hover:text-white transition-colors cursor-default">
                <span className="font-semibold text-blue-400">Hotline:</span>{' '}
                0812-3456-7890
              </p>
              <p className="hover:text-white transition-colors cursor-default">
                <span className="font-semibold text-blue-400">Email:</span>{' '}
                inspektorat@klaten.go.id
              </p>
              <p className="max-w-xs md:ml-auto leading-relaxed">
                Jl. Pemuda No. 1, Klaten, <br className="hidden md:block" />
                Jawa Tengah 57411
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800/50 mt-8 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-xs text-white">
          <p>
            © {new Date().getFullYear()} Pemerintah Kabupaten Klaten. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
