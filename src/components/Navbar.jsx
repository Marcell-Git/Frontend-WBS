import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useLocation } from 'react-router-dom';

import { FiMenu, FiX } from 'react-icons/fi';

import LogoWBS from '../assets/LogoWBS.png';

import useActiveSection from '../hooks/useActiveSection';
import { useAuth } from '../context/AuthContext';

const sectionIds = ['beranda', 'tentang', 'prosedur', 'bantuan'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(sectionIds);

  const isHome = location.pathname === '/';
  const isLacakActive = location.pathname === '/lacak-laporan';

  const { token } = useAuth();

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (active) =>
    `transition-colors duration-300 ${
      active
        ? 'text-blue-700 font-bold'
        : 'text-gray-600 hover:text-blue-700 font-medium'
    }`;

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
      w-[95%] md:w-[85%] lg:w-[70%] max-w-7xl
      bg-white/70 backdrop-blur-lg border border-white/40
      rounded-full transition-all duration-300
      ${scrolled ? 'shadow-lg' : 'shadow-md'}
      `}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <NavLink to="/" className="flex-shrink-0">
          <img
            src={LogoWBS}
            alt="Logo WBS"
            className="h-9 md:h-12 w-auto transition-all"
          />
        </NavLink>

        <ul className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base">
          {sectionIds.map((id) => (
            <li key={id}>
              <HashLink
                smooth
                to={`/#${id}`}
                className={linkClass(activeSection === id && isHome)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </HashLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/lacak-laporan"
              className={({ isActive }) => linkClass(isActive || isLacakActive)}
            >
              Lacak Laporan
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <NavLink
            to={token ? '/aduan' : '/login'}
            className={({ isActive }) =>
              `text-xs md:text-sm font-semibold 
              px-4 py-2 md:px-5 md:py-2.5 
              rounded-full shadow-md transition-all 
              whitespace-nowrap
              ${
                isActive
                  ? 'bg-blue-700 text-white scale-105'
                  : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-105 active:scale-95'
              }`
            }
          >
            Ajukan Laporan
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 mt-3 w-full 
        bg-white/90 backdrop-blur-xl border border-white/50
        rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out origin-top
        ${open ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <ul className="flex flex-col p-4 gap-2 text-center">
          {sectionIds.map((id) => (
            <li key={id}>
              <HashLink
                smooth
                to={`/#${id}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  activeSection === id && isHome
                    ? 'bg-blue-100 text-blue-800 font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </HashLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/lacak-laporan"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-colors ${
                  isActive || isLacakActive
                    ? 'bg-blue-100 text-blue-800 font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Lacak Laporan
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
