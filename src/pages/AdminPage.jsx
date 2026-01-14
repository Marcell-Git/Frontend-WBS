import {useState} from 'react';
import AduanPage from '../components/Admin/AduanPage';
import AkunPage from '../components/Admin/AkunPage';
import Sidebar from '../components/Sidebar';

const AdminPage = () => {
  const [halaman, setHalaman] = useState("Aduan");

  const renderContent = () => {
    switch (halaman) {
      case "Aduan":
        return <AduanPage />; 

      case "Akun":
        return <AkunPage />;

      default:
        return <AduanPage />;
    }
  };

  return (
    <Sidebar 
      activePage={halaman} 
      onMenuClick={(idMenu) => setHalaman(idMenu)}
    >
      {renderContent()}
    </Sidebar>
  );
};

export default AdminPage;
