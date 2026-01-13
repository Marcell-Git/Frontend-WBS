import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoWBS from '../assets/LogoWBS.png';
import useActiveSection from '../hooks/useActiveSection';

const sectionIds = ['beranda', 'tentang', 'prosedur', 'bantuan'];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(sectionIds);

  const isHome = location.pathname === '/';
  const isLacakActive = location.pathname === '/lacak-laporan';

  const linkClass = (active) =>
    `transition-colors ${
      active ? 'text-blue-800 font-semibold' : 'hover:text-blue-800'
    }`;

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white/60 backdrop-blur-md shadow-lg rounded-full w-[70%] max-w-7xl">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/">
          <img src={LogoWBS} alt="Logo WBS" className="h-12" />
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex gap-10 font-medium">
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
              className={({ isActive }) =>
                linkClass(isActive || isLacakActive)
              }
            >
              Lacak Laporan
            </NavLink>
          </li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="bg-blue-900 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition">
            Ajukan Laporan
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden absolute right-6 top-full mt-3 bg-white rounded-2xl shadow-lg w-56 py-2">
          <ul>
            {sectionIds.map((id) => (
              <li key={id}>
                <HashLink
                  smooth
                  to={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 ${
                    activeSection === id && isHome
                      ? 'text-blue-800 font-semibold'
                      : ''
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
                  `block px-4 py-2 ${
                    isActive ? 'text-blue-800 font-semibold' : ''
                  }`
                }
              >
                Lacak Laporan
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
