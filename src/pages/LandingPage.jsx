import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import LandingImage1 from '../assets/LandingImage1.svg';
import LandingImage2 from '../assets/LandingImage2.svg';
import { LuListChecks } from 'react-icons/lu';
import {
  FaCircle,
  FaClock,
  FaLock,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaSave,
  FaScroll,
  FaSearch,
  FaUser,
} from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go';
import {
  FaShield,
  FaFile,
  FaFileCircleCheck,
  FaUpload,
  FaPhone,
  FaLocationDot,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import Hero from '../components/Landing/Hero';
import Tentang from '../components/Landing/Tentang';
import Prosedur from '../components/Landing/Prosedur';
import Bantuan from '../components/Landing/Bantuan';

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Tentang />

        <Prosedur />

        <Bantuan />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
