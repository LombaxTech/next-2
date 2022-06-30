import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
// import { Features } from "./components/features";
// import { About } from "./components/about";
// import { Testimonials } from "./components/testimonials";
// import { Footer } from "./components/footer";
import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";
// import { Contact } from "./components/contact";
// import "animate.css/animate.min.css";
// import ScrollAnimation from "react-animate-on-scroll";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      hello
      <Navigation />
      {/* <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Testimonials data={landingPageData.Testimonials} />
      <Contact data={landingPageData.Contact} />

      <Footer /> */}
    </div>
  );
};

export default LandingPage;
