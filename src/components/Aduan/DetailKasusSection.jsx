import { MdAccessTime, MdInfoOutline } from 'react-icons/md';

const DetailKasusSection = ({
  dataForm,
  kategoriAduanList,
  handleChange,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <MdInfoOutline className="text-blue-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800">
          Detail Kasus
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Kategori Aduan <span className="text-red-500">*</span>
          </label>
          <select
            name="id_kategori"
            value={dataForm.id_kategori}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          >
            <option value="">-- Pilih Kategori --</option>
            {kategoriAduanList.map((kategori) => (
              <option
                key={kategori.id_kategori}
                value={kategori.id_kategori}
              >
                {kategori.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Waktu Kejadian
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
              <MdAccessTime size={20} />
            </div>
            <input
              name="waktu_kejadian"
              type="datetime-local"
              value={dataForm.waktu_kejadian}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">
            Judul Kasus <span className="text-red-500">*</span>
          </label>
          <input
            name="nama_kasus"
            type="text"
            value={dataForm.nama_kasus}
            onChange={handleChange}
            placeholder="Contoh: Indikasi Pungli di Layanan X..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailKasusSection;
