import { useState } from 'react';
import { FaClipboardList, FaBars, FaSignOutAlt } from 'react-icons/fa';

import Logo from '../assets/Logo.svg';
import { MdAccountCircle } from 'react-icons/md';

export default function Sidebar({ children, activePage, onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: 'Aduan', icon: <FaClipboardList />, id: 'Aduan' },
    { name: 'Akun', icon: <MdAccountCircle />, id: 'Akun' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-30
          h-screen w-64 
          bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center border-b border-gray-100">
            <div className=" text-blue-950 justify-center flex flex-col items-center">
              <img src={Logo} alt="Logo WBS" className="h-24 w-auto" />
              <div className="text-lg font-bold">WBS</div>
              <div>Kabupaten Klaten</div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Menu Utama
            </div>

            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => {
                  onMenuClick(menu.id); 
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activePage === menu.id 
                    ? "bg-blue-950 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-lg">{menu.icon}</span>
                {menu.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-4">
          <button onClick={() => setIsOpen(true)} className="text-gray-600">
            <FaBars size={24} />
          </button>
          <span className="font-bold text-gray-800">Dashboard</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
