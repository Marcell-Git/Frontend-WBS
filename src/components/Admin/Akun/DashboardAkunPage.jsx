import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaEdit,
  FaSearch,
  FaUserCircle,
} from 'react-icons/fa';

import { showUserApi } from '../../../api/UserApi';

const StatusBadge = ({ status }) => {
  const styles = {
    admin: 'bg-indigo-50 text-indigo-700 border-indigo-100 ring-indigo-600/20',
    user: 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-600/20',
    default: 'bg-gray-50 text-gray-600 border-gray-100 ring-gray-500/10',
  };

  const selectedStyle = styles[status] || styles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ring-1 ring-inset ${selectedStyle}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === 'admin' ? 'bg-indigo-600' : status === 'user' ? 'bg-emerald-600' : 'bg-gray-500'}`}
      ></span>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}
    </span>
  );
};

const UserAvatar = ({ name }) => {
  const getInitials = (n) => {
    if (!n) return '?';
    return n
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
  ];
  const colorIndex = name ? name.length % colors.length : 0;

  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${colors[colorIndex]}`}
    >
      {getInitials(name)}
    </div>
  );
};

const DashboardAkunPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await showUserApi(search, page);
      const resultData = response.data;
      const meta = response;

      setData(resultData);
      setTotal(meta.total);
      setPerPage(meta.per_page);
      setLastPage(meta.last_page);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(delay);
  }, [search, page]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Manajemen Akun
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data pengguna, role, dan unit kerja.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 bg-white flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Cari username, nama, atau unit..."
              className="block w-full rounded-lg border-0 py-2.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase font-medium tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 w-16 text-center">
                  No
                </th>
                <th scope="col" className="px-6 py-4">
                  User Info
                </th>
                <th scope="col" className="px-6 py-4">
                  Unit Kerja
                </th>
                <th scope="col" className="px-6 py-4">
                  Role
                </th>
                <th scope="col" className="px-6 py-4 text-center w-24">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4 text-center">
                      <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 bg-gray-200 rounded w-8 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-gray-50/80 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">
                      {(page - 1) * perPage + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <UserAvatar name={item.nama_lengkap} />
                        <div className="flex flex-col">
                          <span
                            className="font-semibold text-gray-900 line-clamp-1"
                            title={item.nama_lengkap}
                          >
                            {item.nama_lengkap}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">
                            @{item.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="bg-gray-100 p-1.5 rounded-md text-gray-500 text-xs font-bold border border-gray-200">
                          UNIT
                        </span>
                        {item.nama_unit || (
                          <span className="text-gray-400 italic">
                            Tidak ada unit
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.role} />
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/akun/detail/${item.id_user}`)
                        }
                        className="group/btn relative inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200 transition-all"
                        title="Edit Detail"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FaUserCircle className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium text-gray-900">
                        Tidak ada data ditemukan
                      </p>
                      <p className="text-sm">
                        Coba ubah kata kunci pencarian Anda.
                      </p>
                    </div>
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
  );
};

export default DashboardAkunPage;
