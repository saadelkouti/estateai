import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import CategoryGrid from '../components/home/CategoryGrid';
import StatsSection from '../components/home/StatsSection';
import CityGrid from '../components/home/CityGrid';
import Testimonials from '../components/home/Testimonials';
import CtaBanner from '../components/home/CtaBanner';

export default function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <CategoryGrid />
      <StatsSection />
      <CityGrid />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
