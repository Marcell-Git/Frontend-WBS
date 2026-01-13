import Navbar from '../components/navbar';
import Footer from '../components/Footer';
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
