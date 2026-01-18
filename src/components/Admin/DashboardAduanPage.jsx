import { FaEdit } from 'react-icons/fa';
import { FaFileLines } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


const DashboardAduanPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-fuchsia-500 w-full h-28 px-3 py-3 rounded-xl text-fuchsia-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Total aduan</span>
          </div>
          <div>
            <span className="text-4xl font-bold">150</span>
          </div>
        </div>

        <div className="bg-green-500 w-full h-28 px-3 py-3 rounded-xl text-green-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Aduan selesai</span>
          </div>
          <div>
            <span className="text-4xl font-bold">150</span>
          </div>
        </div>

        <div className="bg-blue-500 w-full h-28 px-3 py-3 rounded-xl text-blue-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Sedang diverifikasi</span>
          </div>
          <div>
            <span className="text-4xl font-bold">150</span>
          </div>
        </div>

        <div className="bg-yellow-500 w-full h-28 px-3 py-3 rounded-xl text-yellow-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Sedang diproses</span>
          </div>
          <div>
            <span className="text-4xl font-bold">150</span>
          </div>
        </div>

        <div className="bg-red-500 w-full h-28 px-3 py-3 rounded-xl text-red-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Aduan ditolak</span>
          </div>
          <div>
            <span className="text-4xl font-bold">150</span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white mt-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Kode Aduan
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Pelapor
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Judul Aduan
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 font-mono">
                  #1234567890
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    Kambing Mancing
                  </div>
                  <div className="text-xs text-gray-400">user@email.com</div>{' '}
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                  <p className="truncate" title="abcdefghijklmnopqrstu">
                    abcdefghijklmnopqrstu
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">10 Mei 2020</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 ring-1 ring-inset ring-blue-700/10">
                    Sedang diverifikasi
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => navigate('/admin/aduan/detail')}
                    className="group relative inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                    title="Edit Data"
                  >
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 font-mono">
                  #9876543210
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">Sapi Terbang</div>
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                  <p className="truncate">Laporan jalan rusak di daerah...</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">11 Mei 2020</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 ring-1 ring-inset ring-green-600/20">
                    Selesai
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="rounded-lg p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="text-xs text-gray-500">
            Menampilkan <span className="font-medium">1</span> sampai{' '}
            <span className="font-medium">2</span> dari{' '}
            <span className="font-medium">20</span> hasil
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-medium text-gray-600 hover:text-indigo-600 disabled:opacity-50">
              Prev
            </button>
            <button className="text-xs font-medium text-gray-600 hover:text-indigo-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAduanPage;
