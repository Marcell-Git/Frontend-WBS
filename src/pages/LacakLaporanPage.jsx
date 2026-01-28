import Navbar from '../components/Navbar';
import { useState } from 'react';

import CekSection from '../components/LacakAduan/CekSection';
import ResultSection from '../components/LacakAduan/ResultSection';

import { lacakAduanApi } from '../api/AduanApi';

const LacakLaporanPage = () => {
  const [dataForm, setDataForm] = useState([]);

  const [kode_tiket, setKodeTiket] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await lacakAduanApi(kode_tiket);
      setDataForm(response.data);
    } catch (error) {
      console.error('Error fetching aduan:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <Navbar />

      <CekSection
        value={kode_tiket}
        onChange={(e) => setKodeTiket(e.target.value)}
        handleSubmit={handleSubmit}
      />

      <ResultSection dataForm={dataForm} formatDate={formatDate} />
    </>
  );
};

export default LacakLaporanPage;
