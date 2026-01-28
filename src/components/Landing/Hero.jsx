import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

import LandingImage1 from '../../assets/LandingImage1.svg';

const Hero = () => {
  const { token } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="beranda"
      className="min-h-screen w-full bg-gradient-to-b from-slate-900 from-40% via-blue-900 via-80% to-white flex items-center relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

      <div className="container mx-auto px-6 pb-20 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-20 z-10 pt-32 lg:pt-0">
        <motion.div
          className="flex flex-col gap-4 flex-1 text-center lg:text-left items-center lg:items-start max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/40 border border-blue-700/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-blue-200 text-xs font-semibold tracking-wide uppercase">
              Sistem Pengaduan Resmi
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1 mt-2">
            <h1 className="text-white text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
              Whistleblowing System
            </h1>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-sm pb-2">
              Kabupaten Klaten
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-lg mt-2 font-light"
          >
            Wadah laporan aman untuk mewujudkan pemerintahan yang{' '}
            <span className="text-white font-medium">bersih</span>,
            <span className="text-white font-medium"> transparan</span>, dan{' '}
            <span className="text-white font-medium">berintegritas</span>.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-6">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg shadow-blue-900/50">
              <NavLink to={token ? '/aduan' : '/login'} className="mr-2">
                Ajukan Laporan
              </NavLink>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end w-full lg:w-auto relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full scale-75"></div>

          <motion.img
            src={LandingImage1}
            alt="Ilustrasi Whistleblowing"
            className="relative w-72 lg:w-full lg:max-w-md h-auto drop-shadow-2xl"
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
