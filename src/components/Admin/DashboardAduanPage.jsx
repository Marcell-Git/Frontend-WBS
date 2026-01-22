import {
  FaCheckCircle,
  FaClipboardList,
  FaEdit,
  FaSearch,
  FaSpinner,
  FaTimesCircle,
} from 'react-icons/fa';
import { FaFileLines } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { showAduanApi, getsummaryAduanApi } from '../../api/AduanApi';

import CountUp from 'react-countup';

import StatusBadge from '../StatusBadge';

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

  const statItems = [
    {
      title: 'Total Aduan',
      count: total,
      bgIcon: 'bg-fuchsia-100', 
      textIcon: 'text-fuchsia-600', 
      icon: <FaClipboardList size={20} />,
    },
    {
      title: 'Aduan Selesai',
      count: summary.selesai,
      bgIcon: 'bg-green-100',
      textIcon: 'text-green-600',
      icon: <FaCheckCircle size={20} />,
    },
    {
      title: 'Proses Penyidikan',
      count: summary.penyidikan,
      bgIcon: 'bg-purple-100',
      textIcon: 'text-purple-600',
      icon: <FaSearch size={20} />,
    },
    {
      title: 'Sedang Diproses',
      count: summary.diproses,
      bgIcon: 'bg-yellow-100',
      textIcon: 'text-yellow-600',
      icon: <FaSpinner size={20} />,
    },
    {
      title: 'Sedang Diverifikasi',
      count: summary.diverifikasi,
      bgIcon: 'bg-blue-100',
      textIcon: 'text-blue-600',
      icon: <FaFileLines size={20} />,
    },
    {
      title: 'Aduan Ditolak',
      count: summary.ditolak,
      bgIcon: 'bg-red-100',
      textIcon: 'text-red-600',
      icon: <FaTimesCircle size={20} />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {item.title}
              </span>
              <span className="text-2xl font-bold text-gray-800">
                <CountUp end={item.count} duration={1.5} />
              </span>
            </div>

            <div
              className={`p-3 rounded-lg ${item.bgIcon} ${item.textIcon} flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>
        ))}
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
                  className="hover:bg-gray-50 font-medium transition-colors"
                  key={item.kode_tiket}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 font-mono">
                    #{item.kode_tiket}
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
                    <StatusBadge status={item.status_aduan} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/aduan/detail/${item.id_aduan}`)
                      }
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
