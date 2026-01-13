import logoWBS from '../assets/logoWBS.png';

const Footer = () => {
  return (
    <footer className="bg-blue-900 px-10 pt-5">
      <div className="flex mx-auto justify-between w-full">
        <div>
          <img src={logoWBS} alt="Logo WBS" />
          <p className="text-blue-200">
            Wadah Laporan Aman untuk Mewujudkan Pemerintahan yang Bersih dan
            Berintegritas
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-bold pb-3 pt-5">Kontak</h2>

          <p className="text-blue-200">Hotline: 08xxxxxxxxxxx</p>
          <p className="text-blue-200">Email: xxxxxxxx@gmail.com</p>
          <p className="text-blue-200">
            Alamat: Jl. Pemuda No. 1, Klaten, Jawa Tengah 57411
          </p>
        </div>
      </div>

      <div className="border-b border-gray-500 mt-4"></div>

      <div className="text-center text-blue-200 py-4">
        © 2026 Pemerintah Kabupaten Klaten. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
