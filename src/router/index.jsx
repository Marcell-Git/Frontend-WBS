import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import LacakLaporanPage from '../pages/LacakLaporanPage';
import AdminPage from '../pages/AdminPage';
import AduanPage from '../pages/AduanPage';
import DetailAduanPage from '../components/Admin/Aduan/DetailAduanPage';
import DashboardAduanPage from '../components/Admin/Aduan/DashboardAduanPage';
import DashboardAkunPage from '../components/Admin/Akun/DashboardAkunPage';

import ProtectedRoute from './ProtectedRoute';
import RegisterPage from '../pages/RegisterPage';
import DetailAkunPage from '../components/Admin/Akun/DetailAkunPage';

const router = createBrowserRouter([
  {
    path: '*',
    element: <div>404 Not Found!</div>,
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/lacak-laporan',
    element: <LacakLaporanPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardAduanPage />,
      },
      {
        path: 'aduan',
        element: <DashboardAduanPage />,
      },
      {
        path: 'aduan/detail/:id_aduan',
        element: <DetailAduanPage />,
      },
      {
        path: 'akun',
        element: <DashboardAkunPage />,
      },
      {
        path: 'akun/detail/:id_user',
        element: <DetailAkunPage />,
      },
    ],
  },
  {
    path: '/aduan',
    element: (
      <ProtectedRoute>
        <AduanPage />
      </ProtectedRoute>
    ),
  },
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
