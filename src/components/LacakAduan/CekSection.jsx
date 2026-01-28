import { FaSearch } from 'react-icons/fa';

const CekSection = ({ value, onChange, handleSubmit }) => {
  return (
    <div className="flex justify-start w-full px-4">
      <div
        className="
              relative 
              mt-20 md:mt-32 lg:mt-32
              w-full max-w-md 
              bg-white 
              rounded-2xl 
              shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
              border border-black/10 
              p-6 sm:p-8 
              flex flex-col gap-6
            "
      >
        <div className="flex gap-3 items-center border-b border-gray-100 pb-4">
          <FaSearch className="text-blue-950 text-xl" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Cek Status Laporan
          </h2>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="kode_tiket"
            className="block text-sm font-semibold text-gray-700 ml-1"
          >
            Kode Aduan
          </label>

          <input
            type="text"
            id="kode_tiket"
            placeholder="Contoh: ADU-2024-001"
            required
            className="
                  block w-full 
                  rounded-xl 
                  border border-gray-300 
                  bg-gray-50 
                  px-4 py-3 
                  text-gray-900 
                  shadow-sm 
                  placeholder:text-gray-400 
                  focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none
                  transition-all duration-200
                "
            value={value}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="
                  w-full 
                  bg-blue-950 hover:bg-blue-900 
                  text-white font-bold 
                  py-3.5 px-4 
                  rounded-xl 
                  transition duration-300 
                  shadow-md hover:shadow-lg hover:-translate-y-0.5
                  flex justify-center items-center gap-2
                "
          >
            <span>Cari Laporan</span>
            <FaSearch className="text-sm opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CekSection;
