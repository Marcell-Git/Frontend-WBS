import { MdAdd, MdDeleteOutline, MdPerson } from 'react-icons/md';

const PelakuSection = ({
  pelakuList,
  odpList,
  onChange,
  onAdd,
  onDelete,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <MdPerson className="text-blue-600 text-xl" />
          <h3 className="text-lg font-bold text-gray-800">
            Pihak Terlapor
          </h3>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="text-sm flex items-center gap-1 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <MdAdd size={18} /> Tambah
        </button>
      </div>

      <div className="space-y-4">
        {pelakuList.map((pelaku, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative"
          >
            {pelakuList.length > 1 && (
              <button
                type="button"
                onClick={() => onDelete(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <MdDeleteOutline size={22} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Unit / ODP
                </label>
                <select
                  name="id_unit"
                  value={pelaku.id_unit}
                  onChange={(e) => onChange(index, e)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                >
                  <option value="">-- Pilih Unit --</option>
                  {odpList.map((odp) => (
                    <option key={odp.id_unit} value={odp.id_unit}>
                      {odp.nama_unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Nama Terlapor
                </label>
                <input
                  name="nama"
                  type="text"
                  value={pelaku.nama}
                  onChange={(e) => onChange(index, e)}
                  placeholder="Nama Lengkap"
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Jabatan
                </label>
                <input
                  name="jabatan"
                  type="text"
                  value={pelaku.jabatan}
                  onChange={(e) => onChange(index, e)}
                  placeholder="Jabatan / Posisi"
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PelakuSection;
