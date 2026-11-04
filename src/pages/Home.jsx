import usePageMeta from '../hooks/usePageMeta';
import Hero from '../components/Home/Hero';
import Intro from '../components/Home/Intro';
import Divisions from '../components/Home/Divisions';
import FeaturedLighting from '../components/Home/FeaturedLighting';
import WhyCrista from '../components/Home/WhyCrista';
import IndustriesShowcase from '../components/Home/IndustriesShowcase';
import EnquiryCTA from '../components/Home/EnquiryCTA';

export default function Home() {
  usePageMeta(null);
  return (
    <>
      <Hero />
      <Intro />
      <Divisions />
      <FeaturedLighting />
      <WhyCrista />
      <IndustriesShowcase />
      <EnquiryCTA />
    </>
  );
}
