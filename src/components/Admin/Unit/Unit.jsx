import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { FaSearch } from 'react-icons/fa';
import { MdAdd, MdBusiness, MdDelete, MdSave } from 'react-icons/md';

import DeleteModal from '../../Modal/DeleteModal';

import { showODPApi, createODPApi, deleteODPApi } from '../../../api/ODPApi';

const Unit = () => {
  const [units, setUnits] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [nama_unit, setNamaUnit] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const fetchUnits = async () => {
    try {
      const data = await showODPApi(search, page);
      setUnits(data.data);
      setTotal(data.total);
      setLastPage(data.last_page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [search, page]);

  const handleAddUnit = async (e) => {
    e.preventDefault();

    try {
      await createODPApi({ nama_unit });
      setNamaUnit('');
      const data = await showODPApi(search, page);
      setUnits(data.data);
      setTotal(data.total);
      setLastPage(data.last_page);

      toast.success('Unit berhasil ditambahkan');
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  };

  const handlerDeleteConfirm = (id) => {
    setSelectedUnitId(id);
    setIsOpen(true);
    console.log('Selected Unit ID for deletion:', id);
  };

  const handleDeleteUnit = async () => {
    try {
      await deleteODPApi(selectedUnitId);
      fetchUnits();
      setIsOpen(false);
      toast.success('Unit berhasil dihapus');
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">Memuat data unit...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Manajemen Unit Kerja
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data unit kerja yang terdaftar dalam sistem.
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <MdAdd className="text-blue-600 text-xl" />
              <h2 className="text-lg font-bold text-gray-800">Tambah Unit</h2>
            </div>

            <form onSubmit={handleAddUnit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Nama Unit Baru <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                    <MdBusiness />
                  </div>
                  <input
                    type="text"
                    value={nama_unit}
                    onChange={(e) => setNamaUnit(e.target.value)}
                    required
                    placeholder="Contoh: Dinas Sosial"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
              >
                <MdSave size={18} />
                <span>Simpan Unit</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800">
                Daftar Unit Terdaftar
              </h2>
            </div>
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaSearch
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama unit..."
                  className="block w-full rounded-lg border-0 py-2.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="w-1 whitespace-nowrap px-6 py-4 font-semibold"
                    >
                      No
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Nama Unit
                    </th>
                    <th
                      scope="col"
                      className="w-1 whitespace-nowrap px-6 py-4 font-semibold text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {units.length > 0 ? (
                    units.map((unit, index) => (
                      <tr
                        className="hover:bg-blue-50/30 font-medium transition-colors"
                        key={index}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 font-mono">
                          {index + 1 + (page - 1) * 10}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {unit.nama_unit}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            onClick={() => handlerDeleteConfirm(unit.id_unit)}
                            className="group relative inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            title="Hapus Data"
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-8 text-center text-gray-400 italic"
                      >
                        Belum ada data unit.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="text-xs text-gray-500">
                Page <span className="font-medium">{page}</span> dari{' '}
                <span className="font-medium">{lastPage}</span> total{' '}
                <span className="font-medium">{total}</span> data
              </div>
              <div className="flex gap-2">
                <button
                  className="text-xs font-medium text-gray-600 hover:text-indigo-600 disabled:opacity-50"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                <button
                  className="text-xs font-medium text-gray-600 hover:text-indigo-600"
                  disabled={page === lastPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDeleteUnit(selectedUnitId)}
        title="Hapus Unit?"
        message="Unit yang dihapus tidak akan bisa dikembalikan lagi."
      />
    </div>
  );
};

export default Unit;
