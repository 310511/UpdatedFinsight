import Hero from "../components/home/Hero";
import FeaturesGrid from "../components/home/FeaturesGrid";
import HowItWorks from "../components/home/HowItWork";
import Footer from "../components/home/Footer";
import FAQ from "../components/home/FAQ";
import Pricing from "../components/home/Pricing";
import Slider from "../components/home/Slider"

const Home = () => {
  return (
    <>
    <Hero />
    <FeaturesGrid />
    <HowItWorks />
    <Slider />
    <Pricing />
    <FAQ />
    <Footer />
    </>
    
  );
};

export default Home;
