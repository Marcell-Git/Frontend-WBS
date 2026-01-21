import { FaEdit } from 'react-icons/fa';
import { FaFileLines } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { showAduanApi, getsummaryAduanApi } from '../../api/AduanApi';

import CountUp from 'react-countup';

const DashboardAduanPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await showAduanApi(page);
        const summaryResult = await getsummaryAduanApi();
        setSummary(summaryResult);
        setData(result.data);
        setLastPage(result.last_page);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching aduan data:', error);
      }
    };
    fetchData();
  }, [page]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const statusStyles = {
    'Sedang diverifikasi': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      ring: 'ring-blue-600/20',
    },
    'Sedang diproses': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      ring: 'ring-yellow-600/20',
    },
    Selesai: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      ring: 'ring-green-600/20',
    },
    Ditolak: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      ring: 'ring-red-600/20',
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-fuchsia-500 w-full h-28 px-3 py-3 rounded-xl text-fuchsia-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Total aduan</span>
          </div>
          <div>
            <span className="text-4xl font-bold"><CountUp end={total} duration={1.5} /></span>
          </div>
        </div>

        <div className="bg-green-500 w-full h-28 px-3 py-3 rounded-xl text-green-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Aduan selesai</span>
          </div>
          <div>
            <span className="text-4xl font-bold"><CountUp end={summary.selesai} duration={1.5} /></span>
          </div>
        </div>

        <div className="bg-blue-500 w-full h-28 px-3 py-3 rounded-xl text-blue-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Sedang diverifikasi</span>
          </div>
          <div>
            <span className="text-4xl font-bold"><CountUp end={summary.diverifikasi} duration={1.5} /></span>
          </div>
        </div>

        <div className="bg-yellow-500 w-full h-28 px-3 py-3 rounded-xl text-yellow-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Sedang diproses</span>
          </div>
          <div>
            <span className="text-4xl font-bold"><CountUp end={summary.diproses} duration={1.5} /></span>
          </div>
        </div>

        <div className="bg-red-500 w-full h-28 px-3 py-3 rounded-xl text-red-800 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FaFileLines size={26} />
            <span className="text-lg font-semibold">Aduan ditolak</span>
          </div>
          <div>
            <span className="text-4xl font-bold"><CountUp end={summary.ditolak} duration={1.5} /></span>
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
              {data.map((item) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={item.id_aduan}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 font-mono">
                    #{item.id_aduan}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {item.nama_pengadu}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <p className="truncate" title={item.nama_kasus}>
                      {item.nama_kasus}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(item.waktu_kejadian)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full ${statusStyles[item.status_aduan]?.bg} px-3 py-1 text-xs font-bold ${statusStyles[item.status_aduan]?.text} ring-1 ring-inset ${statusStyles[item.status_aduan]?.ring}`}
                    >
                      {item.status_aduan}
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
              ))}
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
  );
};

export default DashboardAduanPage;
