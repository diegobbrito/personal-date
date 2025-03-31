import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import ValueCards from "../components/ValueCards/ValueCards";

function Home() {
  return (
    <div className="bg-gradient-to-tl from-[#120e61] to-[#f76d02]">
      <Hero />
      <ValueCards />
      <Footer/>
    </div>
  );
}
export default Home;
